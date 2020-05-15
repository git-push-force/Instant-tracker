import moment from 'moment';

export const checkDate = (date: string): boolean => moment(date, 'YYYY-MM-DD', true).isValid(); 

interface IInput {
    placeholder: string;
    name: string;
    checkDate?: boolean;
}

interface IGroup {
    size: {
        xs: number;
        md: number;
        lg: number;
    }
    inputs: IInput[];
}

export const getInputs = (): IGroup[] => {
    return [
        {
            size: {
                xs: 12,
                md: 7,
                lg: 8
            },

            inputs: [
                {
                    placeholder: 'Name of event',
                    name: 'name'
                },
                {
                    placeholder: 'Description of event',
                    name: 'description'
                }
            ]
        },

        {
            size: {
                xs: 12,
                md: 3,
                lg: 2
            },

            inputs: [
                {
                    placeholder: 'Start of event',
                    name: 'dateStart',
                    checkDate: true
                },
                {
                    placeholder: 'End of event',
                    name: 'dateEnd',
                    checkDate: true
                }
            ]
        }
    ];
}