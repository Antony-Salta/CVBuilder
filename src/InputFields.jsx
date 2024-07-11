
import { useState, useRef } from 'react';
import { initialSections } from './initialSections';
let currentID = 2;

  //so the issue is something to do with passing the add section function. For some reason or another, it essentially sets the state back, I guess to what it was when it was called.
export default function InputFields()
{
  const [nextID, setNextID] = useState(initialSections.length);
  //so basically, the functions accessing state variables treat them like local variables unless I use refs, which forces them to be reference variables, and get the actual state variable from heap rather than each component having a different variable in the stack.
  const nextIDRef = useRef();
  nextIDRef.current = nextID;
  const [sections, setSections] = useState(initialSections);
  const sectionsRef = useRef();
  sectionsRef.current = sections;
  //takes the key of the section that is being called, and adds the new section after it in the array.
  
  /**
   * WHY THIS IS BREAKING
   * components by default keep the old value of the state until they are re-rendered, meaning I make no progress. I don't want to re-render, since that means that I lose the input values inside. 
   * Apparently I can use the UseEffect hook? This doesn't make sense, the travelPlan does basically the same thing as me but doesn't have the issue of state being pegged to what it was when the component was made
   * @param {*} key 
   */
  
  function HandleAddSection(key)
  { // This function seems to reset state every time in a weird way, plus the generated sections don't insert in the correct place, likely because they're getting deleted at the same time themselves.
    
    let newSection = {id: nextIDRef.current, needsName: true, Add: HandleAddSection, Delete: HandleDeleteSection}
    // console.log("in addSections");
    // console.log(sections);
    let temp = [...sectionsRef.current];
    let index = temp.findIndex((section) => section.id === key);
    
    temp = temp.toSpliced(index +1, 0, newSection);
    //   // console.log("temp");
    //   // console.log(temp);
    setSections(temp); // I know this isn't best practice, but I'm not sure what to do with these weird JS array functions
    
    //  console.log("sections");
    //  console.log(sections);
    //  console.log("nextID");
    //  console.log(nextID);
    // setSections([...sectionsRef.current, newSection]);
    setNextID(nextIDRef.current+1);
  }
  // So it turns out that the key thing is actually horribly screwing the rendering. Fixing the keys to be unique makes the printing line up with the state.
  // Bad part is that the state keeps getting bloody reset.

  function AddSection()
  {
    let newSection = {id: nextID, needsName: true, Delete: HandleDeleteSection};
    setSections([...sectionsRef.current, newSection]);
    setNextID(nextIDRef.current+1);
  }

  //removes the section with the specified key.
  function HandleDeleteSection(key)
  {
    // let temp = [...sections]
    // temp.toSpliced(temp.findIndex((section) => section.id === key), 1)
    console.log("sections");
    console.log(sections);
    console.log("sections");
    console.log(sections);
    setSections(sectionsRef.current.filter((section) => section.id !== key));
  }
  //funnily enough, If I add a section, then delete it then add it again, the change state thing goes through and NextID is finally set to 5

  

  function AddStuff()
  {
    let newSection = {id: nextID, needsName: true, Add: HandleAddSection, Delete: HandleDeleteSection};
    setSections([...sections, newSection, {...newSection, id: nextID +1}, {...newSection, id: nextID +2}, {...newSection, id: nextID +3} ]);
    setNextID(nextID +4);
  }
  
  console.log("in render"); 
  console.log(sections);
  return ( 
  <div>
    { sections.map((section) => 
    <SectionInput key={section.id} id={section.id} title={section.title} needsName={section.needsName} Add={section.Add} Delete={section.Delete}/>
    )}
    
    {sections.length === initialSections.length && <SectionButtons id ={initialSections.length-1} AddSection={() => HandleAddSection(initialSections.length-1)} />}
    <button onClick={AddStuff}>Add Stuff</button>

  </div>)
}
//
//<SectionInput key ={-1} id={-1} needsName={true} Add={HandleAddSection} Delete={HandleDeleteSection}/>


function SectionInput({ id, title = null, needsName = false, Add = null, Delete = null})
  {
      return(
          <div>
          {needsName === true ? <> <h3>Section Title</h3> <textarea name = "Section title"/></> : <h2>{title}</h2>}
          <br></br> 
          {needsName === true && <p>Section Content</p>}
          <textarea name = "Section Content"/>
          <br></br>
          <div>
            {Add !== null && <button onClick={() => {Add(id); }}>Add Section Below</button>}
            {Delete !== null && <button onClick ={() => {Delete(id); }}> Delete Section</button>}
          </div>
          <br></br>
          </div>
      )
  }
  
  function SectionButtons({id, AddSection = null, DeleteSection = null})
  {
      //The AddSection and DeleteSection not null checks makes the button only if it should be deletable/ allow a section to be made underneath
      return(
          <div>
          {AddSection !== null && <button onClick={AddSection}>Add Section Below</button>}
          {DeleteSection !== null && <button onClick ={() => {DeleteSection(id); }}> Delete Section</button>}
          </div>
      )
  }

