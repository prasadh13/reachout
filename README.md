# reachout

[![Build Status](https://travis-ci.org/InfosysPublicServices/reachout.svg?branch=master)](https://travis-ci.org/InfosysPublicServices/reachout)
<!--[![Code Climate](https://codeclimate.com/github/InfosysPublicServices/reachout/badges/gpa.svg)](https://codeclimate.com/github/InfosysPublicServices/reachout)-->

# CA HHS ADPQ Response
Link to live prototype: [https://www.reachoutcalifornia.com](https://www.reachoutcalifornia.com)

##Introduction 

reachout was developed during a hackathon to demonstrate our agile design and development capabilities. You have asked to demonstrate a number of approaches in our response, as follows:
![image](https://github.com/InfosysPublicServices/reachout/blob/master/artifacts/approaches.png)

A description of our process can be accessed at: [Process Deck](https://github.com/InfosysPublicServices/reachout/blob/master/artifacts/Process%20Deck.pdf)
Letters in-line below (e.g. [a]) refer to our response to the above items. Numbers in-line below (e.g., [1]) refer to slides within this deck which provide additional proof points regarding our approach.

##Agile Design and Development Approach

### Planning
Planning began with assigning a Product Manager with responsibility for direction and quality of the completed product [a][7]. We then assembled an eight person interdisciplinary core project team who would take the majority of the work, with an extended four person team on call for specific tasks [b][7,8]. Our Product Manager, Delivery Manager and Technical Architect referenced the Infosys agile method [6] and collaborated during this Planning phase to:
* Analyze data available through the CA HHS API* Define high level product vision and priorities* Identify an agile management tool (Taiga) 
In parallel, we conducted user research to understand child welfare in California and the players involved [c] [27,28,29,30]. This research formed the basis of our two user personas: Emily (parent) and Anna (caseworker) [c] [9]. We developed a high-level brand and feature vision and tested it with a random selection of anonymous, non-child welfare related internet [c] [10,31,32,33,34]., non-child welfare engaged internet users [c] [10,31,32,33,34].
###Design – Ideation, Discovery and Product Design
Our team convened in Rockville and remotely in Austin to kick-off the project and work through the Design phase – starting with Ideation. Throughout, we employed Infosys Design Thinking concepts to round out our agile method [5]. This inspired the use of ten user centric design techniques [d].
##### Ideation
Our team reviewed the challenge, the user research and the personas to brainstorm ideas for product features. We used role play to empathize with Emily and Anna and better understand their needs at different times. Our interdisciplinary team contained some child welfare experience, some public sector experience, some commercial experience and many parents. Our ideas were therefore not limited to a public sector lens; but did draw upon parents’ ideas of what would be important to them if their child were removed. These sessions generated detailed user journeys for Emily and Anna with the overarching goal of shortening the duration of Emily’s son’s time in care and helping to ensure family stability once he returned home [c,d] [11,12,13,14].
##### Discovery
We validated and evolved our user journeys and goal statement with a group of individuals outside of the project team, including parents and a former social worker. These discussions generated our product feature set [c,d] [10,11,12,13,14,15]:

* Keeping Emily engaged with decision making regarding her son	* Searching for foster care facilities	* Searching for schools close to the foster care facilities* A chat feature allowing:	* Emily to reach out to Anna for advice and encouragement between visits	* Anna to reach out to Emily to check up on progress against her action items	* Anna to make use of her downtime during the day

##### Product Design
We translated our product feature set into user stories, product flow, white board wireframes and detailed features [15,16,17] and tested them with our extended team and user representatives in two rounds: at the white board stage and, once formal wireframes were generated, with our user group - incorporating feedback at each iteration [c,d,f,g].Wireframe designs can be found at: [Wireframes](https://github.com/InfosysPublicServices/reachout/blob/master/artifacts/wireframes%201-2.pdf)

In parallel with our product design, the Technical Architect defined the technology architecture to comply with your requirement for a modern and open stack [i,o,q] [18,19]. This selection process also included the definition of the product style guide. We employed the US Patent and Trademark Office UI design library. This open source library includes a style guide and was constructed for use in public sector applications.The US PTO UI design library can be found here:  [US PTO UI Design guide](https://uspto.github.io/designpatterns/index.html) [e] [20].

As the Design phase closed out, our Product Manager, Delivery Manager and Technical Architect worked on sprint planning. We selected a two sprint approach and built backlogs accordingly using the Taiga tool to manage the sprints [g] [21].Taiga agile project management proof points can be found here: [Taiga](https://tree.taiga.io/project/smutalik-cmas/)

##### Agile Delivery
For this phase of the project we planned for two sprints. Each day was organized as follows:•	Sprint all day•	Scrum meeting with Product Manager at 5pm•	Following the scrum meeting, the Delivery Manager and Technical Architect followed up on issues and reviewed backlogA retrospective was conducted at the end of each sprint with the core team. Multiple rounds of usability tests were conducted – with the core team, the extended team and with our user group. The primary methods were ‘Think Out Loud’, ‘Remote’ with screen sharing, and user surveys. Feedback from these testing events was shared with the team during scrum meetings. Larger concerns were documented in Taiga [c,f,g] [24,26,35,36,37]. Responsiveness testing was conducted by our core team, then exposed to the user representatives for multiple devices and browsers [h][25]. At this stage we also verified 508 compliance.As new changed code was checked into GitHub, Travis CI choreographed continuous integration with automated unit testing and deployment to AWS within a Docker container [j,k.l,m,o] [18,22].New Relic was used to perform continuous monitoring [n] [23]. We used Google Analytics for user tracking and to conduct A/B testing on reachout UI deployed components [n] [24].Proof points for monitoring can be found here:

[New Relic Metrics](https://github.com/InfosysPublicServices/reachout/blob/master/artifacts/newRelic_Metrics.pdf)

[Google Analytics](https://github.com/InfosysPublicServices/reachout/blob/master/artifacts/googleAnalytics_WebAnalytics.pdf)

[Google A/B Experiment](https://github.com/InfosysPublicServices/reachout/blob/master/artifacts/Google%20Analytics%20A-B%20Testing.pdf)

We used Amazon aws cloud watch to monitor the load balancers and EC2 instances.Proof point for AWS monitoring can be found here:

[Amazon Cloudwatch](https://github.com/InfosysPublicServices/reachout/blob/master/artifacts/AWS-CloudWatch_Metrics.pdf)

####Installation Instructions
Complete installation instructions for reachout can be found here:  [https://github.com/InfosysPublicServices/reachout/blob/master/artifacts/Reachout_Installation_Instructions.pdf](https://github.com/InfosysPublicServices/reachout/blob/master/artifacts/Reachout_Installation_Instructions.pdf)

####Conclusion
The Infosys agile method, combined with Design Thinking allowed us to quickly design build and deploy product that we believe can be genuinely valuable to Emily and Anna.


