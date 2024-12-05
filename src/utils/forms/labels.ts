/*
    This file helps to manage array of labels who could be reused in whole application.
    Encourages to mantain and don't DRY (Don't Repeat Yourself).
*/

import { useMemo } from 'react';
import { useCopy } from '@services';
import { type QueueMethodType, type QueueURLType } from '@types';

export const labels = () => {
  const { getCopyValue } = useCopy();

  const genres = useMemo(
    () => [
      { value: 'man', label: 'signup:SignUp.form.fields.genre.options.man' },
      { value: 'woman', label: 'signup:SignUp.form.fields.genre.options.woman' },
      { value: 'trans', label: 'signup:SignUp.form.fields.genre.options.trans' },
      { value: 'no-binary', label: 'signup:SignUp.form.fields.genre.options.noBinary' },
      { value: 'undetermined', label: 'signup:SignUp.form.fields.genre.options.undetermined' },
    ],
    [],
  );

  const today = useMemo(() => 'common:calendar.values.today', []);

  const monthNames = useMemo(
    () => [
      {
        value: 'january',
        label: getCopyValue('common:calendar.values.monthNames.january'),
      },
      {
        value: 'february',
        label: getCopyValue('common:calendar.values.monthNames.february'),
      },
      {
        value: 'march',
        label: getCopyValue('common:calendar.values.monthNames.march'),
      },
      {
        value: 'april',
        label: getCopyValue('common:calendar.values.monthNames.april'),
      },
      {
        value: '.may',
        label: getCopyValue('common:calendar.values.monthNames.may'),
      },
      {
        value: 'june',
        label: getCopyValue('common:calendar.values.monthNames.june'),
      },
      {
        value: 'july',
        label: getCopyValue('common:calendar.values.monthNames.july'),
      },
      {
        value: 'august',
        label: getCopyValue('common:calendar.values.monthNames.august'),
      },
      {
        value: 'september',
        label: getCopyValue('common:calendar.values.monthNames.september'),
      },
      {
        value: 'october',
        label: getCopyValue('common:calendar.values.monthNames.october'),
      },
      {
        value: 'november',
        label: getCopyValue('common:calendar.values.monthNames.november'),
      },
      {
        value: 'december',
        label: getCopyValue('common:calendar.values.monthNames.december'),
      },
    ],
    [],
  );

  const monthNamesShort = useMemo(() => {
    return [
      {
        value: 'january',
        label: getCopyValue('common:calendar.values.monthNamesShort.january'),
      },
      {
        value: 'february',
        label: getCopyValue('common:calendar.values.monthNamesShort.february'),
      },
      {
        value: 'march',
        label: getCopyValue('common:calendar.values.monthNamesShort.march'),
      },
      {
        value: 'april',
        label: getCopyValue('common:calendar.values.monthNamesShort.april'),
      },
      {
        value: 'may',
        label: getCopyValue('common:calendar.values.monthNamesShort.may'),
      },
      {
        value: 'june',
        label: getCopyValue('common:calendar.values.monthNamesShort.june'),
      },
      {
        value: 'july',
        label: getCopyValue('common:calendar.values.monthNamesShort.july'),
      },
      {
        value: 'august',
        label: getCopyValue('common:calendar.values.monthNamesShort.august'),
      },
      {
        value: 'september',
        label: getCopyValue('common:calendar.values.monthNamesShort.september'),
      },
      {
        value: 'october',
        label: getCopyValue('common:calendar.values.monthNamesShort.october'),
      },
      {
        value: 'november',
        label: getCopyValue('common:calendar.values.monthNamesShort.november'),
      },
      {
        value: 'december',
        label: getCopyValue('common:calendar.values.monthNamesShort.december'),
      },
    ];
  }, []);

  const dayNames = useMemo(() => {
    return [
      {
        value: 'sunday',
        label: getCopyValue('common:calendar.values.dayNames.sunday'),
      },
      {
        value: 'monday',
        label: getCopyValue('common:calendar.values.dayNames.monday'),
      },
      {
        value: 'tuesday',
        label: getCopyValue('common:calendar.values.dayNames.tuesday'),
      },
      {
        value: 'wednesday',
        label: getCopyValue('common:calendar.values.dayNames.wednesday'),
      },
      {
        value: 'thursday',
        label: getCopyValue('common:calendar.values.dayNames.thursday'),
      },
      {
        value: 'friday',
        label: getCopyValue('common:calendar.values.dayNames.friday'),
      },
      {
        value: 'saturday',
        label: getCopyValue('common:calendar.values.dayNames.saturday'),
      },
    ];
  }, []);

  const dayNamesShort = useMemo(() => {
    return [
      {
        value: 'su',
        label: getCopyValue('common:calendar.values.dayNamesShort.su'),
      },
      {
        value: 'mo',
        label: getCopyValue('common:calendar.values.dayNamesShort.mo'),
      },
      {
        value: 'tu',
        label: getCopyValue('common:calendar.values.dayNamesShort.tu'),
      },
      {
        value: 'we',
        label: getCopyValue('common:calendar.values.dayNamesShort.we'),
      },
      {
        value: 'th',
        label: getCopyValue('common:calendar.values.dayNamesShort.th'),
      },
      {
        value: 'fr',
        label: getCopyValue('common:calendar.values.dayNamesShort.fr'),
      },
      {
        value: 'sa',
        label: getCopyValue('common:calendar.values.dayNamesShort.sa'),
      },
    ];
  }, []);

  const undefinedStatus = getCopyValue('common:forms.fields.listItems.status.undefined');
  const pendingStatus = getCopyValue('common:forms.fields.listItems.status.pending');
  const inProgressStatus = getCopyValue('common:forms.fields.listItems.status.inProgress');
  const completeStatus = getCopyValue('common:forms.fields.listItems.status.completed');

  const statusList = useMemo(() => {
    return [
      { value: '0', label: undefinedStatus },
      { value: '1', label: pendingStatus },
      { value: '2', label: inProgressStatus },
      { value: '3', label: completeStatus }
    ]
  }, []);

  const queueMethod: { [key in QueueMethodType]: string } = useMemo(() => {
    return {
      GET: 'queue:Queue.httpVerbs.get',
      POST: 'queue:Queue.httpVerbs.post',
      PUT: 'queue:Queue.httpVerbs.put',
      PATCH: 'queue:Queue.httpVerbs.patch',
      DELETE: 'queue:Queue.httpVerbs.delete',
    };
  }, []);

  const queueEndpoints: { [key in QueueURLType]: string } = useMemo(() => {
    return {
      tasks: 'menu:Menu.menu.items.tasks.title',
    };
  }, []);

  return {
    genres,
    today,
    monthNames,
    monthNamesShort,
    dayNames,
    dayNamesShort,
    statusList,
    undefinedStatus,
    pendingStatus,
    inProgressStatus,
    completeStatus,
    queueMethod,
    queueEndpoints
  };
};
