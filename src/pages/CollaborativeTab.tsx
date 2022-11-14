import React from "react";
import { TinyliciousClient } from "@fluidframework/tinylicious-client";
import { SharedMap } from "fluid-framework";

const getFluidData = async () => {

    // TODO 1: Configure the container.
    const client = new TinyliciousClient();
    const containerSchema = {
        initialObjects: { sharedText: SharedMap }
    };
    // TODO 2: Get the container from the Fluid service.
    let container;
    const containerId = window.location.hash.substring(1);
    if (!containerId) {
        ({ container } = await client.createContainer(containerSchema));
         const id = await container.attach();
        window.location.hash = id;
    } else {
        ({ container } = await client.getContainer(containerId, containerSchema));
    }
    // TODO 3: Return the Fluid timestamp object.
    return container.initialObjects;
}

const styleApp = {
	display: 'flex',  
	flexDirection: 'column',
    justifyContent: 'space-between',
	marginBottom : '50px',
	marginLeft: '100px',
	marginRight: '100px',
	marginTop:'100px'
};

const styleTextarea = {
	color:'white',
	backgroundColor:'black'
};

function CollaborativeTab() {
  const [fluidSharedObjects, setFluidSharedObjects] = React.useState();

React.useEffect(() => {
    getFluidData()
    .then(data => setFluidSharedObjects(data));
}, []);

const [localText, setLocalText] = React.useState();

React.useEffect(() => {
    if (fluidSharedObjects) {

        // TODO 4: Set the value of the localTimestamp state object that will appear in the UI.
	const { sharedText } = fluidSharedObjects;
	const updateLocalText = () => setLocalText({testo : sharedText.get("testo")});
  
	updateLocalText();

	// TODO 5: Register handlers.
	sharedText.on("valueChanged",updateLocalText);
        // TODO 6: Delete handler registration when the React App component is dismounted.
	return () => { sharedText.off("valueChanged", updateLocalText) }
    } else {
        return; // Do nothing because there is no Fluid SharedMap object yet.
    }
}, [fluidSharedObjects])

if (localText) {
	
  return (
        <div className="App" style={styleApp}>
			<textarea  
				rows={20}
				id="textAreaValue" 
				value={localText.testo}
				style={styleTextarea}
			>
			</textarea>
			<button onClick={() => fluidSharedObjects.sharedText.set("testo", document.getElementById('textAreaValue').value+"\n"+document.getElementById('TextInput').value)}>
					Send
			</button>
			<input id="TextInput" type="text" placeholder="Start chatting.." />
        </div>
   )
   } else {
     return <div/>;
   }
}

export default CollaborativeTab;
