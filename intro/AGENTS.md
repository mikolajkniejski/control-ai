# Software Contractor Test Task (3 hours)

ControlAI wants a tool that lets people write to their European MEPs and express their concern with superintelligence and ask their lawmaker to take a stance.

Please build a tool that meets the following specifications:

1. Front-end:
   1. User types in their information details:
      1. Country
      2. Full Name
      3. Address
   2. After picking a country, the user can select from a drop-down of [all the MEPs](https://www.europarl.europa.eu/meps/en/full-list/xml) from their country and pick one to write.
   3. The tool generates an email or inserts the details into a template (example on second page).
   4. When you press “send email” it should open the user's email client and suggest the template be sent to: “[mathias@controlai.com](mailto:mathias@controlai.com)” (as a stand-in for the MEPs actual email).
   5. For inspiration you can check our [UK contact your lawmaker tool](https://controlai.com/take-action/uk).
2. Back-end:
   1. It should be logged on the back-end, when users generate an email, and when they press send.
   2. The email template should be generated on the back-end and be sent to the front-end. (the structure should work such that instead of serving a template, it would be easy to generate a unique one each time with AI).

###

### Email Template

Dear \<name of MP\>,

I hope this message finds you well. I am writing to you as a concerned Polish citizen regarding the pressing issue of the risk of extinction from AI.

The potential extinction risk from AI, notably from developments in superintelligence, is a grave concern that top AI experts, including Nobel Prize and Turing Award recipients, have been vocal about. The warnings from these highly credentialed individuals underscore the necessity for immediate action.

As my elected representative, I urge you to support ControlAI’s campaign statement, which has already gained the support of over 60 of your parliamentary colleagues, as can be seen at controlai.com/statement. For further information, please feel free to contact their policy team at mathias@controlai.com; they have already briefed more than 100 parliamentarians on this issue.

Thank you for your attention to this matter. I look forward to seeing your leadership on this crucial issue.

Sincerely,

\<Full name\>
\<address\>
