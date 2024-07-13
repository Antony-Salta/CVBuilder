export default function CVOutput({sectionText})
{
    //sections will be a list containing the content of the input text areas.
    // The each section will be an object containing a title and a main body text.
    return(
        <div className="CVWrap">
            {sectionText.map(section =>
                <div key={section.id} className="section">
                    <br></br>
                    <h2>{section.title}</h2>
                    <hr></hr>
                    <p>{section.main}</p>
                    <br></br>
                </div>
            )}
        </div>
    );
}