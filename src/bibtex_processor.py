import bibtexparser
import json
import os
import shutil

# Define the types of BibTeX files to be processed
ENTRY_TYPES = ['in_preparation', 'preprints', 'publications', 'talks', 'thesis']

# Paths to the original BibTeX files and the directory for autogenerated files
BIB_FILES_DIR = '../static/bib_files'
AUTOGENERATED_FILES_DIR = '../static/autogenerated_files'

# Dictionary to store the entry IDs and ensure uniqueness across entries
entry_ids_registry = {}

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
        print(f"Entries saved to {json_file.name}")

def split_bibtex_entries(bibtex_entries, output_dir, entry_type):
    """Split BibTeX entries into individual files, each containing a single entry.

    Args:
        bibtex_entries (list): A list of BibTeX entries.
        output_dir (str): The directory where individual BibTeX files will be saved.
        entry_type (str): The type of the entry (e.g., 'publications', 'talks').
    """
    for entry in bibtex_entries:
        # Create a new BibTeX database for each entry
        single_entry_db = bibtexparser.bibdatabase.BibDatabase()
        single_entry_db.entries = [entry]

        # Generate BibTeX content for the entry
        writer = bibtexparser.bwriter.BibTexWriter()
        entry_bibtex_content = writer.write(single_entry_db)

        # Create the output directory if it does not exist
        os.makedirs(output_dir, exist_ok=True)

        # Create the output file path using the entry ID
        output_file_path = os.path.join(output_dir, entry.get('ID', 'unknown_id') + '.bib')

        # Write the BibTeX content to a new file
        with open(output_file_path, 'w') as bib_file:
            bib_file.write(entry_bibtex_content)

        print(f"Entry saved to {output_file_path}")

def update_entry_id(entry, entry_type, ids_registry):
    """Update the ID of a BibTeX entry if it does not exist or needs to be modified.

    Args:
        entry (dict): A single BibTeX entry.
        entry_type (str): The type of the entry (e.g., 'publications', 'talks').
        ids_registry (dict): Dictionary to track unique IDs for each entry type.

    Returns:
        str: The updated or existing entry ID.
    """
    original_id = entry.get('ID', None)
    print(f"Updating entry ID '{original_id}'", end=' ')

    # Generate a unique ID if none exists or if it is a specific entry type
    if not original_id or entry_type in ["talks", "thesis"]:
        author = entry.get('author', 'unknown_author').split(',')[0].replace(' ', '_').lower()
        year = entry.get('year', 'unknown_year')
        title = entry.get('title', 'unknown_title').split(' ')[0].lower()

        # Base format: AUTHOR_YEAR_TITLE (e.g., smith_2021_mytalk)
        entry_id_base = f"{author}{year}{title}"

        # Ensure the ID is unique by appending an index if necessary
        entry_id = entry_id_base
        index = 2
        while entry_id in ids_registry.get(entry_type, []):
            entry_id = f"{entry_id_base}{index}"
            index += 1

        ids_registry[entry_type] = ids_registry.get(entry_type, []) + [entry_id]
        entry['ID'] = entry_id

    # Remove non-alphanumeric characters from the ID
    sanitized_id = ''.join(char for char in entry['ID'] if char.isalnum())
    entry['ID'] = sanitized_id

    if sanitized_id != original_id:
        print(f"to: '{sanitized_id}'")
    else:
        print(f"(UNCHANGED)")

    return sanitized_id

def update_all_entry_ids(bibtex_entries, entry_type, ids_registry):
    """Update the IDs of all BibTeX entries in a list.

    Args:
        bibtex_entries (list): A list of BibTeX entries.
        entry_type (str): The type of the entry (e.g., 'publications', 'talks').
        ids_registry (dict): Dictionary to track unique IDs for each entry type.
    """
    for entry in bibtex_entries:
        update_entry_id(entry, entry_type, ids_registry)

def process_publications():
    """Process publications and talks by splitting and saving them as individual files and JSON.

    This function reads BibTeX entries for various types (e.g., publications, talks), updates their IDs,
    splits them into individual entries, and saves them as both individual BibTeX files and JSON files.
    """
    
    print("CLEANING UP OUTDATED AUTOGENERATED FILES...")

    # Delete all autogenerated files
    shutil.rmtree(AUTOGENERATED_FILES_DIR, ignore_errors=True)

    # Create the necessary directories for the autogenerated files
    os.makedirs(f'{AUTOGENERATED_FILES_DIR}/json_files/', exist_ok=True)
    for entry_type in ENTRY_TYPES:
        os.makedirs(f'{AUTOGENERATED_FILES_DIR}/individual_bib_files/{entry_type}', exist_ok=True)

    for entry_type in ENTRY_TYPES:

        print('\n', '-=' * 60, '\n')
        print(f"PROCESSING '{entry_type.upper()}' ENTRIES...")

        # Load the BibTeX file for the current entry type
        bibtex_db = load_bibtex(f'{BIB_FILES_DIR}/{entry_type}.bib')

        # Extract the entries from the loaded BibTeX database
        bibtex_entries = bibtex_db.entries

        # Update the IDs of the entries
        print("\n", "UPDATING ENTRY IDS...")
        update_all_entry_ids(bibtex_entries, entry_type, entry_ids_registry)

        # Save the entries as JSON
        print("\n", "SAVING ENTRIES AS JSON...")
        save_bibtex_as_json(bibtex_entries, f'{AUTOGENERATED_FILES_DIR}/json_files/{entry_type}.json')

        # Split the entries into individual BibTeX files
        print("\n", "SPLITTING ENTRIES INTO INDIVIDUAL BIBTEX FILES...")
        split_bibtex_entries(bibtex_entries, f'{AUTOGENERATED_FILES_DIR}/individual_bib_files/{entry_type}/', entry_type)

    print('\n', '-=' * 60, '\n')
    print(f"PROCESSING COMPLETED SUCCESSFULLY! ALL AUTOGENERATED FILES ARE SAVED IN '{AUTOGENERATED_FILES_DIR}'.")

if __name__ == '__main__':
    process_publications()
