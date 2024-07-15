export default function CVOutput({sectionText})
{
    //sections will be a list containing the content of the input text areas.
    // The each section will be an object containing a title and a main body text.
    return(
        <div className="CV-wrap">
            <h2 style={{textAlign: "center" }}>{sectionText[0].main}</h2>
            <h2>{sectionText[1].title}</h2>
            <hr></hr>
            <p>{sectionText[1].main}</p>
            {sectionText.toSpliced(0,2).map(section =>
                <div key={section.id} className="section">
                    <br></br>
                    <h2>{section.title}</h2>
                    <hr></hr>
                    <p>{section.main}</p>
                </div>
            )}
        </div>
    );
}