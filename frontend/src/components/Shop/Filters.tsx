import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import { Flex } from '@radix-ui/themes';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

type FiltersProps = {
  activeFilter: string;
  onFilterChange: (newFilter: string) => void;
};

export default function Filters({ activeFilter, onFilterChange }: FiltersProps) {
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onFilterChange(checked ? name : 'all');
  };

  return (
    /* Dodajemy kontener Flex, który wymusi wyśrodkowanie całego formularza */
    <Flex justify="center" style={{ width: '100%' }}>
      <FormControl 
        component="fieldset" 
        variant="standard" 
        sx={{ 
          m: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' // To wyśrodkuje nagłówek "Filtruj rośliny"
        }}
      >
        <FormLabel 
          component="legend" 
          sx={{ 
            color: "#333", 
            "&.Mui-focused": { color: "#333" },
            fontWeight: 'bold',
            marginBottom: '8px',
            textAlign: 'center' // Wyśrodkowanie tekstu napisu
          }}
        >
          Filtruj rośliny
        </FormLabel>

        <FormGroup row sx={{ gap: 2, justifyContent: 'center' }}> 
          <FormControlLabel
            control={
              <Switch checked={activeFilter === "cactus"} onChange={handleChange} name="cactus" color="success" />
            }
            label="Kaktusy"
          />
          <FormControlLabel
            control={
              <Switch checked={activeFilter === "leaf"} onChange={handleChange} name="leaf" color="success" />
            }
            label="Liściaste"
          />
          <FormControlLabel
            control={
              <Switch checked={activeFilter === "flower"} onChange={handleChange} name="flower" color="success" />
            }
            label="Kwiaty"
          />
        </FormGroup>
      </FormControl>
    </Flex>
  );
}