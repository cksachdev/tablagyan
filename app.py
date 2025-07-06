import os
from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route("/")
def home():
    image_folder = os.path.join(app.static_folder, "images/gallery")
    gallery_images = [
        url_for("static", filename=f"images/gallery/{img}")
        for img in os.listdir(image_folder)
        if img.lower().endswith((".jpg", ".png", ".jpeg"))
    ]
    return render_template("index.html", gallery_images=gallery_images)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/courses")
def courses():
    return render_template("courses.html")

@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

if __name__ == "__main__":
    app.run(debug=True)