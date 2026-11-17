# firecat1234.github.io

My personal website and project blog, built with Quarto for DSCI 521. The two code execution posts demonstrate reproducible analysis with R and Python, using MTGJSON card data.

[Visit the website](https://firecat1234.github.io/) · [Browse the blog](https://firecat1234.github.io/blog.html)

## Install the tools

These are the versions recorded in the local build setup. Package versions are recorded separately in `uv.lock` and `renv.lock`.

| Tool | Version used | Installation / how-to |
|:---|:---|:---|
| Quarto | 1.10.18 | [Install Quarto](https://quarto.org/docs/get-started/) |
| uv | 0.12.6 (recorded when the Python environment was created) | [Install uv](https://docs.astral.sh/uv/getting-started/installation/) · [Work with a project](https://docs.astral.sh/uv/guides/projects/) |
| R | 4.6.1 | [Download R](https://www.r-project.org/) · [Use R with Quarto](https://quarto.org/docs/computations/r.html) |
| Python | 3.14, pinned in `.python-version` | Installed by uv in the steps below |
| Git | A current installation | [Install Git](https://git-scm.com/downloads/) |

`renv` bootstraps itself using the committed `.Rprofile` and `renv/activate.R`; you do not need to initialize a new environment. See the [renv introduction](https://rstudio.github.io/renv/articles/renv.html) for how restoring packages works.

Open a new terminal after installing the tools. The build commands below work in PowerShell or a macOS/Linux shell, with `git`, `uv`, `quarto`, and `Rscript` available on PATH.

On Windows, if `Rscript` is not found, run this in PowerShell first, adjusting the folder if you installed R elsewhere:

```powershell
$env:PATH = "C:\Program Files\R\R-4.6.1\bin;" + $env:PATH
$env:QUARTO_R = "C:\Program Files\R\R-4.6.1\bin"
```

## Build from a fresh clone

Run the first two commands from the directory where you want to keep the repository. Run all subsequent commands from its root, the folder containing `_quarto.yml`.

```sh
git clone https://github.com/firecat1234/firecat1234.github.io.git
cd firecat1234.github.io
uv python install 3.14
uv sync --locked
Rscript -e "renv::restore(prompt = FALSE)"
uv run --locked quarto render
```

`uv sync --locked` restores the Python packages without changing the lockfile. `renv::restore()` restores the R packages from `renv.lock`. Installation needs internet access to download Python and packages. See [uv's locking and syncing guide](https://docs.astral.sh/uv/concepts/projects/sync/) for details.

Quarto writes the website to `docs/`, starting at `docs/index.html`. To view that output locally, run the following from the repository root, then open [localhost:8000](http://localhost:8000/) in your browser. Press Ctrl+C in the terminal to stop the server.

```sh
uv run --locked python -m http.server 8000 --bind 127.0.0.1 --directory docs
```

## Data and the two code execution posts

The data comes from [MTGJSON's Amonkhet dataset](https://mtgjson.com/api/v5/AKH.json), published under the [MIT licence](https://mtgjson.com/license/). The committed snapshot is dated **September 22, 2026**, with metadata version `5.3.0+20260922`.

| File | Purpose |
|:---|:---|
| [`data/AKH.json`](data/AKH.json) | Saved source snapshot |
| [`data/akh_cards.csv`](data/akh_cards.csv) | Flattened UTF-8 CSV written by the R post and read by Python |
| [`posts/2r/index.qmd`](posts/2r/index.qmd) | R / knitr post: creature efficiency and tournament highlights |
| [`posts/3py/index.qmd`](posts/3py/index.qmd) | Python / Jupyter post: text length, rarity, and EDHREC rank |

Both data files are included, so ordinary renders do not download data or require an API key. The R post regenerates the CSV from the saved JSON. The Python post excludes cards marked as reprints; the CSV itself retains them. The tournament tables are manually transcribed highlights, with article links in the R post. See the [data notes](data/README.md) for the export format.

### Optional download and CSV regeneration

The R post's first chunk, `download-source-data`, has `#| eval: false`. It is a manual download helper, skipped during rendering. Run that chunk in R from the repository root only if `data/AKH.json` is missing; its file-existence check preserves an existing snapshot.

Downloading again can bring newer data and different ranks. If you intentionally replace the snapshot, record its new metadata date and rebuild the R post before the Python post so the CSV matches:

```sh
uv run --locked quarto render posts/2r/index.qmd
uv run --locked quarto render posts/3py/index.qmd
```

### Running cells in an editor

Open the repository root as your project. Use its renv R session for the R post and its `.venv` Python interpreter for the Python post. Check `getwd()` in R or `Path.cwd()` after `from pathlib import Path` in Python: the working directory should be the repository root, so `data/...` resolves correctly.

The project's `execute-dir: project` setting handles this during rendering; an interactive editor session may need its working directory set separately. See [Quarto's working-directory guide](https://quarto.org/docs/projects/code-execution.html#working-dir).


## Updates / patch notes

`updates.qmd` is the cross-project feed; the existing Blog is unchanged. Draft source lives in `_drafts/updates/`, which is excluded from rendering. Start from `template.md`; follow `AGENTS.md` for commit evidence, screenshot privacy, and mandatory human review. The feed is live once the site is published; each new update post still requires its own approval.

For a content-only preview without running the analysis posts:

```sh
quarto render updates.qmd
quarto render projects.qmd
```

The Updates page shows only its welcome message while there are no published entries. Its synchronous after-body script removes the empty listing before Quarto initializes List.js. Once entries exist, the message is hidden and a labelled Project selector offers “All projects” at every screen width; it shares the sidebar/tag filtering behavior. Keep this script synchronous (no `async` or `defer`) so the empty-list check runs before `DOMContentLoaded`.

The complete build still requires the locked R/Python setup above. After approval, render the whole site so every navigation bar is refreshed before publishing `docs/`. Do not publish merely to preview.

Pending editorial links: verified public ChatGPT creator profile, and the intended public Jungle destination. Private repositories are deliberately not linked publicly.

### Future private-tracker handoff (not wired yet)

The public site must never fetch the private journal or expose its raw CSV/entries. A future exporter should produce a separate, explicitly human-approved **public-safe package**:

- `updates/<slug>/index.qmd`: front matter `title`, `description`, `date` (`YYYY-MM-DD`), and `categories` (project tags), followed by approved Markdown. Remove `draft: true` only after approval of that exact text/media.
- Optional media in the same entry directory, referenced with relative paths, alt text and captions. Only approved public-safe images; no private screenshots or metadata.
- Include public commit/PR links where useful. Keep internal evidence, approvals/audit records, credentials and private URLs on the private side.

Review the export package before importing it into a draft branch. Importing content, rendering, and deploying are separate steps: none grants automatic publication permission. This repository contains only the receiving convention, not an authenticated connection or automated export/import/deploy pipeline.

### Project boundaries and companion drafts

Keep project tags stable, with each project's progress and release state distinct. Each update may have a private working version in the tracker and a separately composed public draft here; only the public-safe version enters this repository. The private exporter convention is `public-approved/<slug>/index.qmd` plus explicitly allowlisted media, producing `public-export/updates/`. An empty approval manifest exports nothing. This is a package handoff, not an automatic connection to GitHub or deployment.

Tracker project-document/checklist snapshots are dated references, not the authority: current source repositories and their project docs win. Verify snapshots before using them as current release evidence.

Cherry Research may eventually have a separate Float / RL log. No second log is created or synchronized by this draft. Prefer a canonical home with links or approved summaries rather than automatically duplicating updates across sites.
