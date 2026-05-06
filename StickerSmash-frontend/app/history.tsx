import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity, View
} from 'react-native';

import { LineChart } from 'react-native-chart-kit';
import { Swipeable } from 'react-native-gesture-handler';

import { useTheme } from '@/components/theme-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type BMIHistoryItem = {
  value: string;
  category: string;
  date: string;
};

export default function HistoryScreen() {
  const { colors } = useTheme();
  const [history, setHistory] = useState<BMIHistoryItem[]>([]);

  // ✅ NEW STATES (edit)
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const screenWidth = Dimensions.get('window').width;

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await AsyncStorage.getItem('bmi_history');
        if (data) setHistory(JSON.parse(data));
      };
      load();
    }, [])
  );

  // ✅ SAVE HELPER
  const saveHistory = async (updated: BMIHistoryItem[]) => {
    setHistory(updated);
    await AsyncStorage.setItem('bmi_history', JSON.stringify(updated));
  };

  // ✅ DELETE
  const deleteItem = async (index: number) => {
    const updated = [...history];
    updated.splice(index, 1);
    saveHistory(updated);
  };

  const chartData = {
    labels: history
      .slice(0, 6)
      .reverse()
      .map(item =>
        new Date(item.date).toLocaleDateString().slice(0, 5)
      ),

    datasets: [
      {
        data: history
          .slice(0, 6)
          .reverse()
          .map(item => Number(item.value)),
      },
    ],
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background }
      ]}
    >

      {/* HEADER */}
      <ThemedView style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText style={{ fontSize: 22, color: colors.text, fontWeight: 'bold' }}>
            ←
          </ThemedText>
        </TouchableOpacity>

        <ThemedText style={[styles.title, { color: colors.text }]}>
          BMI History
        </ThemedText>
      </ThemedView>

      {/* 📊 CHART */}
      {history.length > 1 && (
        <ThemedView style={[styles.chartCard, { backgroundColor: colors.card }]}>
          <ThemedText style={{ color: colors.text, marginBottom: 10 }}>
            Last Records
          </ThemedText>

          <LineChart
            data={chartData}
            width={screenWidth - 70}
            height={220}
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: colors.card,
              backgroundGradientFrom: colors.card,
              backgroundGradientTo: colors.card,
              decimalPlaces: 1,
              color: () => colors.primary,
              labelColor: () => colors.text,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: colors.primary,
              },
            }}
            bezier
            style={{ borderRadius: 16 }}
          />
        </ThemedView>
      )}

      {/* LIST */}
      {history.length === 0 ? (
        <ThemedText style={{ color: colors.text, opacity: 0.6 }}>
          No history yet
        </ThemedText>
      ) : (
        // history.map((item, index) => (
        //   <ThemedView
        //     key={index}
        //     style={[styles.card, { backgroundColor: colors.card }]}
        //   >

        //     {/* ✏️ EDIT MODE */}
        //     {editingIndex === index ? (
        //       <>
        //         <TextInput
        //           value={editValue}
        //           onChangeText={setEditValue}
        //           keyboardType="numeric"
        //           style={[
        //             styles.input,
        //             {
        //               backgroundColor: colors.background,
        //               color: colors.text,
        //               borderColor: colors.border,
        //             }
        //           ]}
        //         />

        //         <TouchableOpacity
        //           style={[styles.button, { backgroundColor: colors.primary }]}
        //           onPress={async () => {
        //             const updated = [...history];

        //             const newValue = parseFloat(editValue);
        //             if (!newValue) return;

        //             updated[index].value = newValue.toFixed(2);

        //             // recalc category
        //             if (newValue < 18.5) updated[index].category = 'Underweight';
        //             else if (newValue < 25) updated[index].category = 'Normal';
        //             else if (newValue < 30) updated[index].category = 'Overweight';
        //             else updated[index].category = 'Obese';

        //             await saveHistory(updated);
        //             setEditingIndex(null);
        //           }}
        //         >
        //           <ThemedText style={styles.buttonText}>Save</ThemedText>
        //         </TouchableOpacity>
        //       </>
        //     ) : (
        //       <>
        //         {/* ORIGINAL UI (UNCHANGED) */}
        //         <ThemedText style={{ color: colors.text, fontSize: 18 }}>
        //           {item.value}
        //         </ThemedText>

        //         <ThemedText style={{ color: colors.text, opacity: 0.7 }}>
        //           {item.category}
        //         </ThemedText>

        //         <ThemedText style={{ color: colors.text, opacity: 0.5, fontSize: 12 }}>
        //           {new Date(item.date).toLocaleDateString()}
        //         </ThemedText>

        //         {/* ✅ NEW ACTIONS (non-breaking) */}
        //         <ThemedView style={[styles.actions, {backgroundColor: 'transparent'}]}>
        //           <TouchableOpacity
        //             onPress={() => {
        //               setEditingIndex(index);
        //               setEditValue(item.value);
        //             }}
        //           >
        //             <ThemedText style={{ color: colors.primary }}>
        //               Edit
        //             </ThemedText>
        //           </TouchableOpacity>

        //           <TouchableOpacity onPress={() => deleteItem(index)}>
        //             <ThemedText style={{ color: 'red' }}>
        //               Delete
        //             </ThemedText>
        //           </TouchableOpacity>
        //         </ThemedView>
        //       </>
        //     )}

        //   </ThemedView>
        // ))

        history.map((item, index) => {
            const renderRightActions = () => (
                <View style={styles.swipeContainer}>

                {/* EDIT */}
                <TouchableOpacity
                    style={[styles.swipeBtn, { backgroundColor: colors.primary }]}
                    onPress={() => {
                    setEditingIndex(index);
                    setEditValue(item.value);
                    }}
                >
                    <ThemedText style={styles.swipeText}>Edit</ThemedText>
                </TouchableOpacity>

                {/* DELETE */}
                <TouchableOpacity
                    style={[styles.swipeBtn, { backgroundColor: 'red' }]}
                    onPress={() => {
                    Alert.alert(
                        "Delete Record",
                        "Are you sure you want to delete this entry?",
                        [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "Delete",
                            style: "destructive",
                            onPress: () => deleteItem(index),
                        },
                        ]
                    );
                    }}
                >
                    <ThemedText style={styles.swipeText}>Delete</ThemedText>
                </TouchableOpacity>

                </View>
            );

            return (
                <Swipeable key={index} renderRightActions={renderRightActions}>

                <ThemedView
                    style={[styles.card, { backgroundColor: colors.card }]}
                >

                    {editingIndex === index ? (
                    <>
                        <TextInput
                        value={editValue}
                        onChangeText={setEditValue}
                        keyboardType="numeric"
                        style={[
                            styles.input,
                            {
                            backgroundColor: colors.background,
                            color: colors.text,
                            borderColor: colors.border,
                            }
                        ]}
                        />

                        <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        onPress={async () => {
                            const updated = [...history];

                            const newValue = parseFloat(editValue);
                            if (!newValue) return;

                            updated[index].value = newValue.toFixed(2);

                            if (newValue < 18.5) updated[index].category = 'Underweight';
                            else if (newValue < 25) updated[index].category = 'Normal';
                            else if (newValue < 30) updated[index].category = 'Overweight';
                            else updated[index].category = 'Obese';

                            await saveHistory(updated);
                            setEditingIndex(null);
                        }}
                        >
                        <ThemedText style={styles.buttonText}>Save</ThemedText>
                        </TouchableOpacity>
                    </>
                    ) : (
                    <>
                        <ThemedText style={{ color: colors.text, fontSize: 18 }}>
                        {item.value}
                        </ThemedText>

                        <ThemedText style={{ color: colors.text, opacity: 0.7 }}>
                        {item.category}
                        </ThemedText>

                        <ThemedText style={{ color: colors.text, opacity: 0.5, fontSize: 12 }}>
                        {new Date(item.date).toLocaleDateString()}
                        </ThemedText>
                    </>
                    )}

                </ThemedView>
                </Swipeable>
            );
            })
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  card: {
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
  },

  chartCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },

  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },

  swipeContainer: {
    flexDirection: 'row',
    height: '100%',
    },

    swipeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    borderRadius: 16,
    marginBottom: 10,
    },

    swipeText: {
    color: '#fff',
    fontWeight: 'bold',
    },
});