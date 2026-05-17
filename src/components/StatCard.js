import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export default function StatCard({ title, value }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="labelMedium">{title}</Text>
        <Text variant="headlineMedium" style={styles.value}>
          {value}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 16,
  },
  value: {
    marginTop: 8,
    fontWeight: "bold",
  },
});
