type ModalStateWeek = {
    id:number;
    classContent:string,
    studyMethod:string,
    operate:string,
    preparationCategory:string,
    openCollapse:boolean
}

interface DataProfile {
    table1: {
        subjectTitle: string;
        subjectCode: string;
        categories: string;
        point: string;
        actualPoint: string;
        professor: string;
        evaluationMethods: string;
    };
    table2: {
        typeClass1: string;
        typeClass2: string;
    };
    table3: TableCustom[];
}

interface DataTemporary {
    table4: {
        trainingPhilosophy: string;
        courseSummary: string;
        learningGoals: string;
        required: string;
        cqi: string;
    };
    table5: {
        method: string;
    };
    table6: {
        exerciseContent: string;
        feedback: string;
    };
    table7: {
        attendance: string;
        learningOutcomes: LearningOutcome[];
        midtermExam: string;
        finalExam: string;
        exercise: string;
        points: string;
    };
    table8: {
        mainTextbooks: Textbook;
        additionalTextbooks: Textbook;
        otherTextbook: Textbook;
    };
    table9: {
        note: string;
    };
}

type TableCustom = {
    rowNum: RowNum[];
    selectBoxValue?: string;
}

type RowNum = {
    col: string;
}
