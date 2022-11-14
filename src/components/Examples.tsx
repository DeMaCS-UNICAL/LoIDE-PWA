import React from "react";
import Select from 'react-select';
import battagliaNavale from './filesExamples/battagliaNavale.js';
import bisacce from './filesExamples/bisacce.js';

const options = [
  { value: 'battagliaNavale', label: 'battagliaNavale' },
  { value: 'bisacce', label: 'bisacce' },
]

const style = {
	border: '1px solid white',
	borderRadius: '8px',
	width: '400px',
};

const styleBox = {
	marginBottom: '50px',
	marginLeft: '50px',
	marginRight: '50px',
	marginTop: '50px'
};

const content = {
	display: 'flex',  
	justifyContent:'center', 
	alignItems:'center', 
	height: '100vh'
};

const styleButton = {
	marginTop: '20px',
	width:'300px',
	height:'35px',
	backgroundColor: 'black',
	color: 'white',
	border: '1px solid white',
	borderRadius: '6px'
};

const myTextAreaStyle = {
	resize: 'none'
};

const battagliaNavaleText = battagliaNavale;
const bisacceText = bisacce;
const currentValue = '';

function selectExample(currentValue)
{	
	if(document.getElementById("Examples").textContent == 'battagliaNavale')
	{
		currentValue = battagliaNavaleText;
	}
		if(document.getElementById("Examples").textContent == 'bisacce')
	{
		currentValue = bisacceText;
	}
	document.getElementById("MyTextArea").value = currentValue;
	navigator.clipboard.writeText(currentValue);
}

const Examples: React.FC = () => {
	

  return (
  
	<div style={content}>
		<div style={style}>
			<div style={styleBox}>
				<h4>Examples</h4>
				<p>Choose an example from those suggested here</p>
				<Select 
					id="Examples" 
					options={options}
				/>
				<button 
					style={styleButton} 
					onClick={selectExample}
				>
					Select
				</button>
				<p>Preview : Here you can see a preview of the example.
					You can run it by loading it into the editor via the Load Example button</p>
				<textarea 
					style={myTextAreaStyle}
					rows={10}
					cols={35}
					id="MyTextArea" 
					value={currentValue}
					defaultValue={''}
				>
				</textarea>
			</div>
		</div>
	</div>
  );
};

export default Examples;
