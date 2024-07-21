import { Card } from '@mui/material';
import ContentTablePerson from './ContentTablePerson';
import { Person } from '@/models/person';
import api from '@/utils/api/api';
import { useEffect } from 'react';

interface TablePersonProps {
  person: Person[];
  setPerson: React.Dispatch<React.SetStateAction<Person[]>>;
}

const TablePerson: React.FC<TablePersonProps> = ({ person, setPerson }) => {
  useEffect(() => {
      const fetchPersons = async () => {
        try {
          const persons = await api.listPerson();
          setPerson(persons);
        } catch (error) {
          console.error('Error fetching roles:', error);
        }
      };
      fetchPersons();
  }, [setPerson]);

  return (
      <Card>
          <ContentTablePerson person={person} setPerson={setPerson} />
      </Card>
  );
};

export default TablePerson;
