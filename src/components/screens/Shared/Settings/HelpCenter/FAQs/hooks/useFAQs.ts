import { useEffect, useMemo } from 'react';
import { jsonToArray } from '@utils/functions';
import { storage } from '@redux/store';
import { type MenuItemProps } from '@types';
import faqs from '@services/translations/resources/es/shared/faqs.json';

export const useFAQs = (): {
  listItems: Array<MenuItemProps>;
} => {
  useEffect(() => {
    // storage.delete('faqs');
    storage.set('faqs', JSON.stringify(faqs));
  }, []);

  const resArray = useMemo(() => {
    const objectFaqs: any = storage.getString('faqs');
    if (storage.contains('faqs')) {
      const faqObject = jsonToArray(JSON.parse(objectFaqs)) || [];
      return faqObject;
    }

    return [];
  }, [faqs]);

  const listItems = useMemo(() => {
    return [
      {
        items: resArray.map((item) => {
          return {
            leftIcon: 'help',
            title: item.question,
            description: item.answer,
          };
        }),
      },
    ];
  }, [resArray]);

  return {
    listItems,
  };
};

export default useFAQs;
