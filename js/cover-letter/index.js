// import fs from "fs";
const fs = require("fs")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const pdf = require("pdf-parse");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);


const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1.5,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

let command;
  command = `You are a cover letter editor. You will be given a piece of isolated text from within a cover letter and told how you can improve it. Only respond with the revision. Make sure the revision is in the same language as the given isolated text.`;

  const gptConfig = {
    completeCoverLetter: `You are a cover letter generator.
  You will be given a job description along with the job applicant's resume.
  You will write a cover letter for the applicant that matches their past experiences from the resume with the job description. Write the cover letter in the same language as the job description provided!
  Rather than simply outlining the applicant's past experiences, you will give more detail and explain how those experiences will help the applicant succeed in the new job.
  You will write the cover letter in a modern, professional style without being too formal, as a modern employee might do naturally.`,
    coverLetterWithAWittyRemark: `You are a cover letter generator.
  You will be given a job description along with the job applicant's resume.
  You will write a cover letter for the applicant that matches their past experiences from the resume with the job description. Write the cover letter in the same language as the job description provided!
  Rather than simply outlining the applicant's past experiences, you will give more detail and explain how those experiences will help the applicant succeed in the new job.
  You will write the cover letter in a modern, relaxed style, as a modern employee might do naturally.
  Include a job related joke at the end of the cover letter.`,
    ideasForCoverLetter:
      "You are a cover letter idea generator. You will be given a job description along with the job applicant's resume. You will generate a bullet point list of ideas for the applicant to use in their cover letter. ",
  };

// Access your API key as an environment variable (see "Set up your API key" above)

// Converts local file information to a GoogleGenerativeAI.Part object.
// function fileToGenerativePart(path, mimeType) {
//   return {
//     inlineData: {
//       data: Buffer.from(fs.readFileSync(path)).toString("base64"),
//       mimeType
//     },
//   };
// }

// Turn images to Part objects
// const filePart1 = fileToGenerativePart("pd.pdf", "application/pdf")

const filePath = "pd.pdf";

const file = async () => {
  const dataBuffer = fs.readFileSync(filePath);

  try{
    const pdfData = await pdf(dataBuffer);
    console.log("PDF Content:");
    return pdfData.text
  }catch (err){
    console.log("Error reading PDF:", err);
  }

}

async function run() {
  // Choose a Gemini model.
  const title = "Flutter Developer"

  const description = `
  They are looking for an experienced Flutter Developer who has a passion for creating customer-centric, cutting-edge solutions. You will be a key part of their tech team, contributing to their mobile technology stack, delivering high-quality code, and improving processes in a fast-paced, collaborative environment.

    Responsibilities:
    Advance the user and developer experience, delivering high-quality stories within agreed timelines.
    Write clean, maintainable code, follow best practices, and ensure detailed documentation.
    Build complex UI and widgets, working closely with UX designers to enhance user experience.
    Participate in technical discussions, offering meaningful contributions to drive innovation.
    Build strong relationships with developers, testers, and PMs across the department.
    Promote and follow agreed ways of working within the team.
    Ensure a smooth deployment process to app stores.
    
    Requirements:
    Extensive experience in mobile app development.
    Excellent knowledge of Flutter and cross-platform development
    Familiarity with native Android/iOS development (Swift, Kotlin, Java).
    Experience in building and styling complex UI and widgets.
    Knowledge of different state management solutions.
    Familiarity with Git source control and agile workflows.
    Experience with CI tools and the app store deployment/review process.
    Strong appreciation for design and the ability to collaborate effectively with UX teams.
  
  `

  const prompt = `My Resume: ${file}. Job title: ${title} Job Description: ${description}.`;


 

  // const generatedContent = await model.generateContent([prompt, ...imageParts]);
  
  try {
    const generateContent = await model.startChat({
      generationConfig,
      history:[
        {
          role:"user",
          parts:[
            {text:prompt}
          ]
        },
        {
          role:"model",
          parts:[
            {text:gptConfig.coverLetterWithAWittyRemark}
          ]
        }
      ]
    })
    const result = await generateContent.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }catch (err){
    console.log(err) 
  }
}

run();
