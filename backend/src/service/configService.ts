import { appendFileSync } from "fs"
import path from "path";



export const writeDetsOfUserInFile = (name: string,email: string,passowrd: string) => {
    try {
        appendFileSync(path.join("./src/config/productionDetails/user.txt"), `\n${name} -----------------   ${email} -----------------   ${passowrd}`);
        console.log('Data appended successfully');
    } catch (error) {
        console.log("when writing file error happend:-\t", error);

    }
}

