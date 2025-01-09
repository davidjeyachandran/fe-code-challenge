export const formFields = [
    {
        id: 'fullname',
        name: 'fullname',
        label: 'Full Name',
        type: 'text',
        autoFocus: true
    },
    {
        id: 'email',
        name: 'email',
        label: 'Email Address',
        type: 'email',
    },
    {
        id: 'emailConfirm',
        name: 'emailConfirm',
        label: 'Confirm Email Address',
        type: 'email',
    }
] as const;
