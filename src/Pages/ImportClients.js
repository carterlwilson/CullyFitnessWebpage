import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Papa from 'papaparse';
import Client from '../Models/Client';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Input = styled('input')({
    display: 'none',
});

export default function ImportClients() {

    const [csvParseResults, setCsvParseResults] = useState();

    const [clientFile, setClientFile] = useState();

    const parseCsv = (file) => {
        let data = Papa.parse(file);
        console.log(data);
    }

    const onChangeFile = (e) => {
        let file = 
        //setClientFile(file);
        parseCsv(file);
    }

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

    const addClientsToDb = (input) => {
        let clients = [];
        let csvArray = input.data

        let slicedNameArray = csvArray[0].slice(2);

        let csvArrayWithoutNames = csvArray.slice(1);
        csvArrayWithoutNames.forEach((row) => {
            let rowWithoutNames = row.slice(2);
            let newClient = buidClient(row[0], row[1], slicedNameArray, rowWithoutNames)
            clients.push(newClient);
        });

        console.log(clients);
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
            <Typography>This is the import page</Typography>
            <form id="myForm" onSubmit={onSubmit}>
                <input type="file" id="csvFile" accept=".csv" />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </Box>
    )
}