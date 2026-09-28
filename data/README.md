# Amonkhet data

Source: [MTGJSON](https://mtgjson.com/), specifically [AKH.json](https://mtgjson.com/api/v5/AKH.json), published under the [MIT licence](https://mtgjson.com/license/).

`AKH.json` is the saved snapshot dated **September 22, 2026**, with metadata version `5.3.0+20260922`. `akh_cards.csv` is the UTF-8 export produced by the [R post](../posts/2r/index.qmd) and read by the [Python post](../posts/3py/index.qmd).

The CSV keeps the selected scalar fields and joins each card's `colors`, `types`, `subtypes`, and `keywords` with semicolons inside a CSV field. Missing `isReprint` flags become `FALSE`. Alternate printings and split-card halves remain as separate rows here; the posts handle duplicate card names during preparation. Reprints remain in the CSV and are filtered out in the Python analysis.

Both files are included in the repository, so rendering does not download data. The R post's `download-source-data` chunk is disabled for renders and can be run manually if the JSON is missing. See the [build instructions](../README.md#build-from-a-fresh-clone) and [download / regeneration steps](../README.md#optional-download-and-csv-regeneration).
