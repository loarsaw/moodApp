import React from 'react';
import { Stack, Tabs } from 'expo-router';

export default function StackLayout() {

    return (
        <Stack
        >
            <Stack.Screen
                name="list"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="details"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
}
