import os
from flask import Flask, render_template, url_for
from flask import request, render_template, redirect
from flask_mail import mail, Message

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

@app.route('/send_mail', methods=['POST'])
def send_mail():
    name = request.form['name']
    phone = request.form['phone']
    email = request.form.get('email', 'Not provided')
    purpose = request.form['purpose']
    message = request.form.get('message', 'No message provided')
    courses = request.form.getlist('courses') if purpose == 'enroll' else []

    content = f"""Name: {name}
Phone: {phone}
Email: {email}
Purpose: {purpose}
Courses: {', '.join(courses) if courses else 'N/A'}
Message: {message}"""

    msg = Message(
        subject="New Contact Form Submission - TablaGyan",
        sender="noreply@tablagyan.com",  
        recipients=["sanjanapatil.in@gmail.com"],  
        body=content
    )

    mail.send(msg)
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)