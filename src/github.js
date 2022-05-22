"use strict";

import { URLNotFoundError, AuthError } from "./errors.js";
import fetch from "node-fetch";
import "dotenv/config"
import process from "node:process"
const CLASSROOM_ASSIGNMENT_REGEX = /^.*\/classrooms\/(.+)\/assignments\/([\w\-\d\.]+)/;


class ClassroomAssignment {
    /**
     * 
     * @param {String} url 
     */
    constructor(url, oauth_token) {
        if (url === undefined)
            throw new URLNotFoundError();

        if (oauth_token === undefined)
            throw new AuthError();

        this.oauth_token = oauth_token;


        var regex = CLASSROOM_ASSIGNMENT_REGEX.exec(url);

        this.classroom = regex[1];
        this.assignment = regex[2];
    }

    async download_roster_grades() {
        var url = `https://classroom.github.com/classrooms/${this.classroom}/assignments/${this.assignment}/download_grades`;
        // Need to download the file poiinted at that url
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `token ${this.oauth_token}`
                }
            })
            console.log(await response.text());
        }
        catch (error) {
            console.log(error);
        }
    }
}

new ClassroomAssignment(process.env.GITHUB_CLASSROOM_URL, process.env.GITHUB_AUTH_TOKEN).download_roster_grades()
