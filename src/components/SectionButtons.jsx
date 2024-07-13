
export default function SectionButtons({id, AddSection = null, DeleteSection = null})
  {
    //Possible TODO: make a submit button so that the CV only updates when the button clicked?
      //The AddSection and DeleteSection not null checks makes the button only if it should be deletable/ allow a section to be made underneath
      return(
          <div>
          {AddSection !== null && <button onClick={() => {AddSection(id); }}>Add Section Below</button>}
          {DeleteSection !== null && <button onClick ={() => {DeleteSection(id); }}> Delete Section</button>}
          </div>
      )
  }