import axios from "axios";

export const ForgetPasswordResetMailApi = async(senderEmail,receiverEmail,senderNameDisplay,receiverNameDisplay,mailSubject,mailText)=>{

    try {
    const response = await axios.post(
      "https://api.mailjet.com/v3.1/send",
      {
        Messages: [
          {
            From: {
              Email: senderEmail,
              Name: senderNameDisplay,
            },
            To: [
              {
                Email: receiverEmail,
                Name: receiverNameDisplay,
              },
            ],
            Subject: mailSubject,
            TextPart: mailText,
            HTMLPart: `<h3>${mailText}</h3>`,
          },
        ],
      },
      {
        auth: {
          username: "b535c29632b7b7ae2a88117b0481ecca",   //public key 
          password: "c79d5b734de025ba16c0478d0a8ddcef",   //private key
        },
      }
    );
    return response.data;
    } catch (error) {
       console.log("forgetpasswordapierror",error);
    }

};