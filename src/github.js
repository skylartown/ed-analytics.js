"use strict";

import { URLNotFoundError, AuthError } from "./errors.js";
import axios from "axios";
import fs from "fs"
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
        axios.defaults
        try {
            const response = await axios.get(url);
            fs.writeFile("response.html", response.data, err => {
                console.log(err);
            })
            /*
            Tried to see what is in the response,it is the github classroom login page
            We need to authenticate ourself before being able to download that CSV file
            */
        } catch (error) {
            console.error(error);
        } 
    }
}

new ClassroomAssignment("https://classroom.github.com/classrooms/91765210-python100/assignments/python101/", process.env.GITHUB_API_KEY).download_roster_grades()
