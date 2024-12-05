import { useMemo, useCallback } from 'react';
import { storage } from '@redux/store';
import { useAppAlerts } from '@hooks';

interface StorageHookOptions<T> {
    key: string; // MMKV key
    defaultValue?: T[]; // Default value if there is nothing in storage
}

export const useMMKVStorageArray = <T extends { id: string }>(
    options: StorageHookOptions<T>
) => {
    const { showQueueUpdatedToast } = useAppAlerts();
    const { key, defaultValue = [] } = options;

    // Obtain initial data from storage
    const getMMKVData = useCallback((): T[] => {
        const storedValue = storage.getString(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    }, [key, defaultValue]);

    // Obtain item by id from storage
    const getMMKVItem = useCallback(
        (id: number): T | undefined => {
            const data = getMMKVData();
            const storedItem = data.find((item) => item.idRequest === id);

            return storedItem;
        },
        [getMMKVData]
    );

    // Save data in local storage
    const saveMMKVData = useCallback(
        (data: T[]) => {
            storage.set(key, JSON.stringify(data));
        },
        [key]
    );

    // Add new item in local storage
    const addMMKVItem = useCallback(
        (item: T) => {
            const data = getMMKVData();
            const updatedData = [...data, item];
            saveMMKVData(updatedData);
        },
        [getMMKVData, saveMMKVData]
    );

    // Update item in local storage using id or index
    const updateMMKVItem = useCallback(
        (id: number | null, updatedItem: Partial<T>) => {
            const data = getMMKVData();

            let index: number;

            if (id === null || typeof id === 'undefined') {
                throw new Error(
                    'A valid idRequest or index must be provided to update an item.'
                );
            }
            // Determine the index to update
            if (id >= 0 && id < data.length) {
                // Using id as direct index
                index = id;
            } else {
                // Search index using id
                index = data.findIndex((item) => item.idRequest === id);
            }

            if (index === -1) {
                throw new Error(`Item with idRequest or index: ${id} not found`);
            }
            // Create a new copy of the array with the updated element
            const updatedData = [...data];
            updatedData[index] = {
                ...data[index],
                method: updatedItem.method,
                body: updatedItem
            };
            showQueueUpdatedToast();
            saveMMKVData(updatedData);
        },
        [getMMKVData, saveMMKVData]
    );

    // Delete item in local storage using id or index
    const removeMMKVItem = useCallback(
        (id: number | null) => {
            const data = getMMKVData();
            let updatedData: T[];

            if (id === null || typeof id === 'undefined') {
                throw new Error(
                    'A valid idRequest or index must be provided to remove an item.'
                );
            }

            // If the item hasn't id then use index, remove it by position
            if (id >= 0 && id < data.length) {
                updatedData = data.filter((_, index) => index !== id);
            } else {
                // If it's an idRequest, remove it by its id
                updatedData = data.filter((item) => item.idRequest !== id);
            }

            saveMMKVData(updatedData);
        },
        [getMMKVData, saveMMKVData]
    );


    const clearMMKVData = useCallback(() => {
        saveMMKVData([]);
    }, [saveMMKVData]);

    return useMemo(
        () => ({
            getMMKVData,
            getMMKVItem,
            addMMKVItem,
            updateMMKVItem,
            removeMMKVItem,
            clearMMKVData,
        }),
        [getMMKVData, getMMKVItem, addMMKVItem, updateMMKVItem, removeMMKVItem, clearMMKVData]
    );
};
