export interface Course {
    id: string;
    title: string;
    code: string;
    name: string;
    description: string;
    skills: string[];
}

export const notableContent: Course[] = [
    {
        id: "comp550",
        title: "Comp 550: Algorithms and Analysis",
        code: "COMP 550",
        name: "Algorithms and Analysis",
        description: "Honed skills in designing and analyzing computer algorithms. The course emphasized problem-solving skills and formal thinking, covering topics such as algorithm analysis, asymptotic notation, divide and conquer, greedy algorithms, dynamic programming, and graph algorithms.",
        skills: [
            "Algorithm Analysis",
            "Asymptotic Notation",
            "Divide and Conquer",
            "Greedy Algorithms",
            "Dynamic Programming",
            "Graph Algorithms"
        ]
    },
    {
        id: "comp210",
        title: "Comp 210: Data Structures and Analysis",
        code: "COMP 210",
        name: "Data Structures and Analysis",
        description: "Mastered Java programming, data structures, and the \"Object Oriented Programming\" paradigm. Learned about Java syntax, abstract data types (ADTs), and memory management. Key topics included recursion, lists, stacks, queues, binary trees, sorting algorithms, and graph theory.",
        skills: [
            "Java Programming",
            "Abstract Data Types (ADTs)",
            "Memory Management",
            "Algorithm Efficiency",
            "Sorting Algorithms",
            "Graph Theory",
            "Hash Tables"
        ]
    },
    {
        id: "comp301",
        title: "Comp 301: Foundations of Programming",
        code: "COMP 301",
        name: "Foundations of Programming",
        description: "Enhanced proficiency in Java programming to an advanced level. Acquired a deep understanding of encapsulation, inheritance, polymorphism, mutability, abstraction, and error handling. Delved into design patterns like Iterator, Decorator, Singleton, Multiton, and Factory, and the MVC pattern.",
        skills: [
            "Java Programming Refined",
            "JUnit Testing",
            "Design Patterns",
            "MVC Pattern",
            "Async Programming"
        ]
    },
    {
        id: "comp426",
        title: "Comp 426: Modern Web Programming",
        code: "COMP 426",
        name: "Modern Web Programming",
        description: "Adopted a practical and hands-on approach to mastering the design, construction, and interaction with web APIs, back-end server applications, and front-end client apps. Emphasized collaborative development workflows, project management, and documentation.",
        skills: [
            "JavaScript",
            "Node.js",
            "Express.js",
            "REST APIs"
        ]
    },
    {
        id: "comp590-sensing",
        title: "Comp 590: Ubiquitous Systems and Intelligent Sensing",
        code: "COMP 590",
        name: "Ubiquitous Systems",
        description: "Successfully integrated a sensor with a computer, establishing communication via GET and POST requests to a MongoDB server. Developed an Amazon Alexa application to intelligently report and analyze sensor data.",
        skills: [
            "Arduino Programming",
            "Amazon Alexa Skills Kit",
            "Python",
            "MongoDB",
            "HTTP Requests"
        ]
    },
    {
        id: "comp562",
        title: "Comp 562: Intro to Machine Learning",
        code: "COMP 562",
        name: "Intro to Machine Learning",
        description: "Gained a comprehensive understanding of fundamental machine learning concepts. Covered topics such as linear regression, logistic regression, neural networks, support vector machines, decision trees, and ensemble methods.",
        skills: [
            "Machine Learning",
            "Linear/Logistic Regression",
            "Neural Networks",
            "SVMs",
            "Decision Trees"
        ]
    },
    {
        id: "comp211",
        title: "Comp 211: Systems Fundamentals",
        code: "COMP 211",
        name: "Systems Fundamentals",
        description: "Undertook a comprehensive exploration of essential computer systems concepts. Immersed in C programming, delving into pointers, arrays, strings, and memory management. Explored CPU organization, memory management, and I/O systems.",
        skills: [
            "C Programming",
            "Assembly Language",
            "Instruction Set Architecture",
            "Memory Management"
        ]
    },
    {
        id: "comp455",
        title: "Comp 455: Models of Languages and Computation",
        code: "COMP 455",
        name: "Models of Languages",
        description: "Gained understanding of finite automata, regular expressions, context-free grammars, and Turing machines. Explored the limits of computability through undecidability and the halting problem.",
        skills: [
            "Language Theory",
            "Automata",
            "Grammars",
            "Turing Machines",
            "Problem Solving"
        ]
    },
    {
        id: "math231-233",
        title: "Math 231-233: Calculus 1, 2, and 3",
        code: "MATH 231-233",
        name: "Calculus Sequence",
        description: "Covered limits, derivatives, integrals, infinite series, and multivariable calculus. Developed a deep understanding of calculus and its broad applications in solving complex problems and modeling real-world phenomena.",
        skills: [
            "Calculus",
            "Multivariable Calculus",
            "Integration Techniques",
            "Infinite Series"
        ]
    },
    {
        id: "math347",
        title: "Math 347: Linear Algebra",
        code: "MATH 347",
        name: "Linear Algebra",
        description: "Learned about vector spaces, linear transformations, matrices, determinants, eigenvalues, and eigenvectors. Also covered inner product spaces, orthogonality, and the Gram-Schmidt process.",
        skills: [
            "Vector Spaces",
            "Linear Transformations",
            "Matrices",
            "Eigenvalues"
        ]
    },
    {
        id: "stor435",
        title: "Stor 435: Introduction to Probability",
        code: "STOR 435",
        name: "Intro to Probability",
        description: "Gained a deep understanding of probability spaces, random variables, distributions, and expected values. Learned to analyze relationships between variables and understood the central limit theorem's significance.",
        skills: [
            "Probability Theory",
            "Random Variables",
            "Distributions",
            "Statistical Inference"
        ]
    },
    {
        id: "comp110",
        title: "Comp 110: Introduction to Programming",
        code: "COMP 110",
        name: "Intro to Programming",
        description: "Gained a comprehensive understanding of programming basics using Python. Learned about syntax, data types, control structures, functions, lists, and file input/output.",
        skills: [
            "Python Programming",
            "Data Types",
            "Control Structures",
            "Functions"
        ]
    },
    {
        id: "stor120",
        title: "Stor 120: Foundations of Statistics and Data Science",
        code: "STOR 120",
        name: "Stats and Data Science",
        description: "Learned about descriptive statistics, probability, random variables, and probability distributions. Used Python to analyze data, refining programming skills while acclimating to new statistical topics.",
        skills: [
            "Descriptive Statistics",
            "Probability Distributions",
            "Hypothesis Testing",
            "Python for Data Analysis"
        ]
    },
    {
        id: "poli209",
        title: "POLI 209: Analyzing Public Opinion",
        code: "POLI 209",
        name: "Analyzing Public Opinion",
        description: "Immersed in the empirical study of public attitudes on political issues. Learned to use statistical and programming techniques, particularly R and Qualtrics, to analyze public opinion data.",
        skills: [
            "Empirical Analysis",
            "R Programming",
            "Qualtrics",
            "Survey Design",
            "Data Collection"
        ]
    },
    {
        id: "comp590-vis",
        title: "Comp 590: Visualization Design Methods",
        code: "COMP 590",
        name: "Visualization Design",
        description: "Mastered D3.js for creating dynamic and interactive data visualizations. Created various types of visualizations, including pie charts and overlapped bar graphs, integrating real-world data.",
        skills: [
            "D3.js",
            "Data Visualization",
            "Interactive Design",
            "JavaScript"
        ]
    },
    {
        id: "comp523",
        title: "Comp 523: Team Software Development",
        code: "COMP 523",
        name: "Team Software Development",
        description: "Engaged in a real-world software development environment, working with a team to develop Generative AI models for segmenting Brain CT scans. Adopted agile methodology and worked with clients.",
        skills: [
            "Agile Development",
            "Generative AI (GANs)",
            "TensorFlow & PyTorch",
            "Project Management"
        ]
    },
    {
        id: "inls161",
        title: "INLS 161: Tools for Information Literacy",
        code: "INLS 161",
        name: "Tools for Info Literacy",
        description: "Explored essentials of information literacy and practical applications involving word processing, spreadsheets, and presentation software. Gained proficiency in basic HTML/CSS and data organization.",
        skills: [
            "Information Literacy",
            "HTML & CSS",
            "Spreadsheets",
            "Presentation Design"
        ]
    },
    {
        id: "udemy-react",
        title: "Udemy: Complete React Native",
        code: "CERT",
        name: "React Native Zero to Mastery",
        description: "Learned fundamentals of React Native and React, including hooks, navigation, and animations. Developed practical projects like a robot search app and a restaurant review app.",
        skills: [
            "React Native",
            "React Hooks",
            "JavaScript",
            "Expo",
            "Mobile Development"
        ]
    }
];
