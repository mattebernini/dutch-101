from flask import Flask, render_template
import requests

app = Flask(__name__)


def extract_text_from_google_docs(doc_url):
    try:
        doc_id = doc_url.split("/")[5]
        response = requests.get(f"https://docs.google.com/document/d/{doc_id}/export?format=txt")
        if response.status_code == 200:
            return response.text
        else:
            return None
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None


@app.route('/')
def dutch101():
    doc_url = "https://docs.google.com/document/d/1-i-J61A-A5QagoMuVSpPz-Pa-s1V0kXRUi4BGgCSnGw/edit"
    document_text = extract_text_from_google_docs(doc_url)
    table_content = document_text.splitlines()
    frasi = []
    for c in table_content:
        tmp = c.split(" - ")
        frasi.append([tmp[0], tmp[1]])

    return render_template("dutch-101.html", frasi=frasi)

if __name__ == '__main__':
    app.run(debug=True)
