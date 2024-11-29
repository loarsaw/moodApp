import { RootState } from '@/redux/store';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

type Question = {
    question: string;
    options: string[];
    correctAnswer: string;
};

type SolutionProps = {
    username: string;
    score: number;
    attemptedOn: string;
    questions: Question[];
};

const SolutionDetails: React.FC<SolutionProps> = ({

}) => {
    const params = useLocalSearchParams()
    console.log(params)
    const { questions } = useSelector((state: RootState) => state.questions)

    const { history } = useSelector((state: RootState) => state.history)

    const renderSolution = ({ item, index }: { item: Question; index: number }) => (
        <View style={styles.solutionCard}>
            <Text style={styles.questionText}>
                Q{index + 1}: {item.question}
            </Text>
            <Text style={styles.correctAnswerText}>
                Correct Answer: {item.correctAnswer}
            </Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.score}>Score: {history[0].score}</Text>
                <Text style={styles.attemptedOn}>Attempted On: {history[0].attemptedOn}</Text>
            </View>

            <FlatList
                data={questions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderSolution}
                contentContainerStyle={styles.listContainer}
                scrollEnabled={false}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#1A73E8',
        borderRadius: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    score: {
        fontSize: 18,
        color: '#fff',
        marginVertical: 5,
    },
    attemptedOn: {
        fontSize: 16,
        color: '#E0E0E0',
    },
    listContainer: {
        marginTop: 20,
    },
    solutionCard: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    correctAnswerText: {
        fontSize: 14,
        color: '#4CAF50',
    },
});

export default SolutionDetails;
