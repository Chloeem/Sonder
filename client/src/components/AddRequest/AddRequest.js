import React, { useState } from 'react'
import { useTranslation } from "react-i18next";

const AddRequest = ({setAllRequests, allRequests}) => {
    const { t } = useTranslation();
    const user = localStorage.getItem("user")
    const jsonUser = JSON.parse(user)
    

    const [newRequest, setNewRequest] = useState("")

    const NewRequest = () => {
      
        console.log(jsonUser)
        fetch("/requests/new", {
            method: "post",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                    text: newRequest,
                    userCreatedBy: jsonUser
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('request posted succesfully')
                let updatedRequests = [data, ...allRequests]
                setAllRequests(updatedRequests);
                setNewRequest("");
            })
            .catch(err => console.log(err))
        }
 
    return (
    <div>
        <h2>{t("request_page_intro_sentence")}</h2>
        <form>
            <label htmlFor="request">{t("type_request")}</label>
            <input type="text" 
                value={newRequest}
                onChange = {(e) => setNewRequest(e.target.value)}
                placeholder={t("request_placeholder")}
                data-testid="requestBody"
            /> 
           
            <button
                data-testid="addRequestButton"
                onClick = {(e) => {
                    e.preventDefault();
                    NewRequest()}} >
                {t("request_button")}
            </button>
        </form>
    </div>
    )
}

export default AddRequest;