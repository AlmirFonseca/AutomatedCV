import bibtexparser
import json

# Define paths for publication and talk files
PUBLICATIONS_PATH = '../static/publication/'
TALKS_PATH = '../static/talk/'

# Define folders for BibTeX files
PUBLICATIONS_BIBTEX_FOLDER = PUBLICATIONS_PATH + 'bibtex/'
TALKS_BIBTEX_FOLDER = TALKS_PATH + 'bibtex/'

# Define paths for BibTeX and JSON files
PUBLICATIONS_BIBTEX_PATH = PUBLICATIONS_PATH + 'publication_references.bib'
PUBLICATIONS_JSON_PATH = PUBLICATIONS_PATH + 'json/publications.json'
PREPRINTS_JSON_PATH = PUBLICATIONS_PATH + 'json/preprints.json'

TALKS_BIBTEX_PATH = TALKS_PATH + 'talk_references.bib'
TALKS_JSON_PATH = TALKS_PATH + 'json/talks.json'

def load_bibtex(file_path):
    """Load BibTeX entries from a file.

    Args:
        file_path (str): The path to the BibTeX file.

    Returns:
        BibDatabase: A BibDatabase object containing the parsed BibTeX entries.
    """
    with open(file_path) as bibtex_file:
        return bibtexparser.load(bibtex_file)
    
def save_bibtex_as_json(bibtex_entries, json_path):
    """Save BibTeX entries as a JSON file.

    Args:
        bibtex_entries (list): A list of BibTeX entries.
        json_path (str): The path to the JSON file where entries will be saved.
    """
    with open(json_path, 'w') as json_file:
        json.dump(bibtex_entries, json_file, indent=4)

def split_bibtex(bibtex_entries, bib_path):
    """Split BibTeX entries into individual files, each containing a single entry.

    Args:
        bibtex_entries (list): A list of BibTeX entries.
        bib_path (str): The directory where individual BibTeX files will be saved.
    """
    for entry in bibtex_entries:
        # Create a new BibTeX database for each entry
        entry_lib = bibtexparser.bibdatabase.BibDatabase()
        entry_lib.entries = [entry]

        # Generate BibTeX content for the entry
        writer = bibtexparser.bwriter.BibTexWriter()
        entry_bibtex_content = writer.write(entry_lib)

        # Create the output file path using the entry ID
        output_path = bib_path + entry.get('ID', 'unknown_id') + '.bib'
        
        # Write the BibTeX content to a new file
        with open(output_path, 'w') as bib_file:
            bib_file.write(entry_bibtex_content)

        print(f"Entry saved to {output_path}")

def process_publications():
    """Process publications and talks by splitting and saving them as individual files and JSON.

    This function reads BibTeX entries for publications and talks, splits them into individual
    entries, and saves them both as individual BibTeX files and as JSON files. Publications are
    further split into articles and preprints based on their entry type.
    """
    print("Processing publications and talks...")

    # Load the BibTeX files for publications and talks
    publications_and_preprints = load_bibtex(PUBLICATIONS_BIBTEX_PATH)
    talk_lib = load_bibtex(TALKS_BIBTEX_PATH)

    # Extract the entries from the loaded BibTeX data
    publications_and_preprints_entries = publications_and_preprints.entries
    talk_entries = talk_lib.entries

    # Split the publications and preprints based on the 'ENTRYTYPE' (e.g., 'article' or 'unpublished')
    publication_entries = [entry for entry in publications_and_preprints_entries if entry.get('ENTRYTYPE', "unknown_type") == 'article']
    preprint_entries = [entry for entry in publications_and_preprints_entries if entry.get('ENTRYTYPE', "unknown_type") == 'unpublished']

    # Save the publication entries, preprint entries, and talk entries as JSON files
    save_bibtex_as_json(publication_entries, PUBLICATIONS_JSON_PATH)
    save_bibtex_as_json(preprint_entries, PREPRINTS_JSON_PATH)
    save_bibtex_as_json(talk_entries, TALKS_JSON_PATH)

    # Split the publication, preprint, and talk entries into individual BibTeX files
    split_bibtex(publication_entries, PUBLICATIONS_BIBTEX_FOLDER)
    split_bibtex(preprint_entries, PUBLICATIONS_BIBTEX_FOLDER)
    split_bibtex(talk_entries, TALKS_BIBTEX_FOLDER)

    print("Processing complete.")

if __name__ == '__main__':
    process_publications()
