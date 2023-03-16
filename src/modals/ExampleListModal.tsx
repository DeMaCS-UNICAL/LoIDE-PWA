import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import DataTable , {createTheme} from "react-data-table-component";
import React , { useEffect, useState }from "react";

import battleshipDescription from '../assets/examples/battleshipDescription.js';
import saddlebagsDescription from '../assets/examples/saddlebagsDescription.js';

interface ExamplesModalListProps {
    isOpen: boolean;
    onDismiss: (value: boolean) => void;
  }
  
  const ExampleListModal: React.FC<ExamplesModalListProps> = (props) => {
      
    const [showModal, setShowModal] = useState<boolean>(false);
  
    const handleChange = ({ selectedRows }) => {
        if(selectedRows[0].Title == "Battleship"+" "+battleshipDescription)
        {
            (window as any).example = "Battleship";
            setShowModal(false);
        }
        if(selectedRows[0].Title == "Saddlebags"+" "+saddlebagsDescription)
        {
            (window as any).example = "Saddlebags";
            setShowModal(false);
        }
    };
      
      useEffect(() => {
          setShowModal(props.isOpen);
      }, [props.isOpen]);
      
      createTheme('solarized', {
      text: {
        primary: 'white',
        secondary: '#2aa198',
      },
      background: {
        default: '#656565',
      },
      context: {
        background: '#cb4b16',
        text: '#FFFFFF',
      },
      divider: {
        default: '#073642',
      },
      action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
      },
    }, 'dark');
  
    const columns = [
          {
            name: "Title",
            selector: (row) => row.Title,
            sortable: true
          },
      ];
  
    const data = [
      {
        Title: "Battleship"+" "+battleshipDescription,
      },
      {
        Title: "Saddlebags"+" "+saddlebagsDescription,
      }
    ];
  
      const customStyles = {
        rows: {
            style: {
                minHeight: '50px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                wordBreak: 'break-all',
            },
        },
      };
      
    return (
      <IonModal isOpen={showModal} onDidDismiss={() => props.onDismiss(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Select example from the list</IonTitle>
            <IonButtons slot="end">
              <IonButton color="primary" onClick={() => props.onDismiss(false)}>
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <p>You can tick one of the boxes below to select an example and view it in the Editor</p>
          <DataTable 
            columns={columns} 
            data={data} 
            highlightOnHover
            selectableRows={true}
            theme="solarized"
            customStyles={customStyles}
            onSelectedRowsChange={handleChange}
            className="dataTable"
          />
          </IonContent>
          </IonModal>
    );
  };
  
export default ExampleListModal;
