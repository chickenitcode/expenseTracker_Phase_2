import { showMenu } from "../utils/showMenu.js";
import { addTransaction } from "./addTransaction.js";
import { deleteTransaction } from "./deleteTransaction.js";
import { displaySumary } from "./displaySumary.js";
import { displayTransactions } from "./displayTransaction.js";


export async function yourChoice(service, rl){
    let running = true;
    while(running){
        //let running = true;
        showMenu();

        const choice = await rl.question("Choose your option: ");


        switch(choice.trim()){
            case "1":
                // pass
                await addTransaction(service, rl);
                break;
            case "2":
                //pass
                await deleteTransaction(service, rl);
                break;
            case "3":
                //pass
                await displayTransactions(service);
                break;
            case "4":
                const hasData = await displaySumary(service);

                if(!hasData){
                    console.log("Let's create your first transaction!");
                    await addTransaction(service, rl);
                }
                break;
                //pass
            case "5":
                //pass
                running = false;
                break;
            default: 
                console.log("Invalid option!!! Please try again!");
        }
    }
}