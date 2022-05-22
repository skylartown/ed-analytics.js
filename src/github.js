"use strict";

import { URLNotFoundError, AuthError } from "./errors.js";


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

    download_roster_grades() {
        var url = `https://classroom.github.com/classrooms/${this.classroom}/assignments/${this.assignment}/download_grades`;

        // ...
    }
}
