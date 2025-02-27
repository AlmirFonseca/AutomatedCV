Rscript -e 'rmarkdown::render("./src/RodrigoSTarginoCV.Rmd"); rmarkdown::render("./src/RodrigoSTarginoCV_short.Rmd")'
 
pip install -r ./src/requirements.txt
python ./src/bibtex_processor.py