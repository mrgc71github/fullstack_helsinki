# Exercises List
## 0.1 HTML Tutorial
https://developer.mozilla.org/es/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content


## 0.2 CSS Tutorial
https://developer.mozilla.org/es/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content

## 0.3 HTML Forms
https://developer.mozilla.org/es/docs/Learn_web_development/Extensions/Forms/Your_first_form

## 0.4 New Note's Diagram
```mermaid
sequenceDiagram
    autonumber
    participant browser
    participant server
    participant data

    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note [{note: My new note}]
    server->>data: CREATE [{note: My new note}]
    data->>server: 201 https://studies.cs.helsinki.fi/exampleapp/notes
    server->>browser: HTTP 301 https://studies.cs.helsinki.fi/exampleapp/notes
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes 
    server->>browser: [data.json: https://studies.cs.helsinki.fi/exampleapp/data.json]
```


## 0.5 SPA Diahgram
```mermaid
sequenceDiagram
    autonumber
    participant browser
    participant server

    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    server->>browser: HTTP 200 https://studies.cs.helsinki.fi/exampleapp/spa.js
    server->>browser: HTTP 200 https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>broswer: Event Linstener spa.js
```


## 0.6 SPA Diahgram
```mermaid
sequenceDiagram
    autonumber
    participant browser
    participant spa.js
    participant server
    participant data

    browser->>spa.js: Event: form submit
    spa.js->>browser: Redraw Notes
    spa.js->>server:  XHR https://studies.cs.helsinki.fi/exampleapp/new_note [{"content": "Aragua", "date": "2026-09-23T20:23:18.802Z"}]
    server->>data: CREATE [{"content":   	"Aragua", "date": "2026-09-23T20:23:18.802Z"}]
    data->>server: 201 [{"message":"note created"}]
```