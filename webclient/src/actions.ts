export function messageChange( value )
{
    return { type: "MESSAGECHANGE", payload: value };
}

export function sendMessage()
{
    return { type: "SENDMESSAGE" };
}

export function openAddNewUser()
{
    return { type: "OPENADDNEWUSER" };
}

export function closeAddNewUser()
{
    return { type: "CLOSEADDNEWUSER" };
}
export function submitAddNewUser()
{
    return { type: "SUBMITADDNEWUSER" };
}

export function changedAddNewUser( fieldName, value )
{
    return { type: "CHANGEDADDNEWUSER",
	     payload: {
		 fieldName: fieldName,
		 value: value
	     }
	   };
}

export function activePDFDocumentChange( pdf_file_data )
{
    return { type: "ACTIVEPDFDOCUMENTCHANGE",
	payload: pdf_file_data
    }
}
