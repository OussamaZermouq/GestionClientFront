import ExampleNavigationMenu from "../fragments/navigationBar/ExampleNavigationMenu";
import CssBaseline from '@mui/joy/CssBaseline';
import { useLocation } from "react-router-dom";
import ClientProfile from "../fragments/Client/clientProfile";

export default function UpdateClient(){
    const search = useLocation().search;
    const id=new URLSearchParams(search).get("id");
    return(
        <main>
            <ExampleNavigationMenu />
            <ClientProfile client_id={id}/>
            <CssBaseline />
        </main>
    );
}