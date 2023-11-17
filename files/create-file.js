import express from "express";
import fs from 'fs';

const file_type = process.argv[2];
const file_name = process.argv[3];
const file_path = process.argv[4] ?? '';
const customFileExtension = 'js';

export async function getContent() {
    if (file_type.toUpperCase() === 'REQUEST') {
        return "import { check } from 'express-validator'";
    }
    return '';
}


export async function createFile() {
    try {

        const customFileName = file_name;
        const fileDirectory = `./${file_type}/${file_path}/`;
        const filePath = `./${file_type}/${file_path}/${customFileName}.${customFileExtension}`;
        const fileContent = await getContent();


        if (!fs.existsSync(fileDirectory)) {
            fs.mkdirSync(fileDirectory, { recursive: true });
        }

        if (fs.existsSync(filePath)) {
            console.error(`File already exists:${filePath}`);

        } else {
            fs.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    console.error(`Error creating the file: ${err}`);

                } else {
                    console.log(`File created successfully: ${filePath}`);
                }
            });
        }
    } catch (err) {
        console.error(`Error creating the file: ${err}`);
    }
}

createFile();