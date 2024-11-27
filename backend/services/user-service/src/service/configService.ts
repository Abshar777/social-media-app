import { appendFileSync } from "fs";
import path from "path";


export const writeDetsOfUserInFile = (name: string, email: string, password: string) => {
    try {
        const filePath = path.resolve(__dirname, "../config/productionDetails/user.txt");
        appendFileSync(filePath, `\n${name} -----------------   ${email} -----------------   ${password}`);
        console.log('Data appended successfully');
    } catch (error) {
        console.log("Error occurred while writing to file: ", error);
    }
};

