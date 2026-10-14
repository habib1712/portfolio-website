import flask
from flask import render_template, request, redirect, url_for
import sqlite3

app = flask.Flask(__name__)
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def create_table():
    connection = get_db_connection()

    connection.execute('''
    CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            requester TEXT NOT NULL,
            priority TEXT NOT NULL DEFAULT 'Medium',
            status TEXT NOT NULL DEFAULT 'Open',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
            ''')
    connection.commit()
    connection.close()

@app.route("/")
def dashboard():
    connection = get_db_connection()

    tickets = connection.execute(
        "SELECT * FROM tickets ORDER BY created_at DESC"
    ).fetchall()

    total_tickets = connection.execute(
        "SELECT COUNT(*) FROM tickets"
    ).fetchone()[0]

    open_tickets = connection.execute(
        "SELECT COUNT(*) FROM tickets WHERE status = 'Open'"
    ).fetchone()[0]

    in_progress_tickets = connection.execute(
        "SELECT COUNT(*) FROM tickets WHERE status = 'In Progress'"
    ).fetchone()[0]

    resolved_tickets = connection.execute(
        "SELECT COUNT(*) FROM tickets WHERE status = 'Resolved'"
    ).fetchone()[0]

    connection.close()

    return render_template(
        "dashboard.html",
        tickets=tickets,
        total_tickets=total_tickets,
        open_tickets=open_tickets,
        in_progress_tickets=in_progress_tickets,
        resolved_tickets=resolved_tickets
    )





@app.route("/create-ticket", methods=["GET", "POST"])
def create_ticket():
    if request.method == "POST":
        title = request.form["title"]
        description = request.form["description"]
        requester = request.form["requester"]
        priority = request.form["priority"]

        connection = get_db_connection()

        connection.execute(
            """
            INSERT INTO tickets (title, description, requester, priority)
            VALUES (?, ?, ?, ?)
            """,
            (title, description, requester, priority)
        )

        connection.commit()
        connection.close()

        return redirect(url_for("dashboard"))

    return render_template("create_ticket.html")

@app.route("/update-status/<int:ticket_id>", methods=["POST"])
def update_status(ticket_id):
    status = request.form["status"]

    if status not in ["Open", "In Progress", "Resolved"]:
        return redirect(url_for("dashboard"))

    connection = get_db_connection()

    connection.execute(
        "UPDATE tickets SET status = ? WHERE id = ?",
        (status, ticket_id)
    )

    connection.commit()
    connection.close()

    return redirect(url_for("dashboard"))



create_table()

if __name__ == "__main__":
    app.run(debug=True)
