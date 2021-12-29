import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Papa from 'papaparse';
import Client from '../Models/Client';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, writeBatch } from "firebase/firestore";
import Snackbar from '@mui/material/Snackbar';
import { ThemeProvider } from '@emotion/react';
import csvscreenshot from '../csvscreenshot.png';
import csvFormatScreenshot from '../csvFormatScreenshot.png';


const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBoQT4L3shuLfXGgQeQKR6jv2V0zA-Xnk0',
    authDomain: 'cullyfitness.firebaseapp.com',
    projectId: 'cullyfitness'
  });

const db = getFirestore();

const Input = styled('input')({
    display: 'none',
});

export default function ImportClients() {

    const [csvParseResults, setCsvParseResults] = useState();
    const [clientFile, setClientFile] = useState();
    const [successToast, setSuccessToast] = useState(false);

    const parseCsv = (file) => {
        let data = Papa.parse(file);
        console.log(data);
    }

    const onChangeFile = (e) => {
        let file = 
        //setClientFile(file);
        parseCsv(file);
    }

    const handleClose = (event, reason) => {
        setSuccessToast(false);
    };

    const buidClient = (firstName, lastName, exerciseNames, maxes) => {
        let tempMaxes = [];
        exerciseNames.forEach((name, index) => {
            let max = {
                name: name,
                weight: maxes[index]
            };
            tempMaxes.push(max);
        });
        return new Client(firstName, lastName, tempMaxes);
    }

    const addClientsToDb = async (input) => {
        let clients = [];
        let csvArray = input.data

        let slicedNameArray = csvArray[0].slice(2);

        let csvArrayWithoutNames = csvArray.slice(1);
        csvArrayWithoutNames.forEach((row) => {
            let rowWithoutNames = row.slice(2);
            let newClient = buidClient(row[0], row[1], slicedNameArray, rowWithoutNames)
            clients.push(newClient);
        });

        const batch = writeBatch(db);
        clients.forEach((client) => {
            let name = client.firstName + client.lastName;
            const docRef = doc(db, "Clients", name);
            batch.set(docRef, Object.assign({}, client));
        })

        batch.commit().then((success) => setSuccessToast(true)); 
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const csvFile = document.getElementById("csvFile");
        let uploadedFile = csvFile.files[0]
        let data = Papa.parse(uploadedFile, {
            complete: function(results, file) {
                setCsvParseResults(results);
                console.log('parsing complete read', csvParseResults); 
                addClientsToDb(results);
            },
            error: function(error, file) {
                console.log(error);
            }
        });
        console.log(data);
    }

    return (
        <Box>
            <Snackbar
            open={successToast}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Successfully Imported Clidents"
            />
            <Typography>This is the import page. You can import a client spreadsheet here as a csv file. Don't know how to get a csv file? You can use the screenshot below for any google docs file.</Typography>
            <img src={csvscreenshot} alt="screenshot" width="500" />
            <Typography>The spreadsheet needs to be formatted like the screenshot below:</Typography>
            <img src={csvFormatScreenshot} alt="screenshot" width="500" />
            <form id="myForm" onSubmit={onSubmit}>
                <input type="file" id="csvFile" accept=".csv" />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </Box>
    )
}