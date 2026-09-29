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
