<script lang="ts">
    import {
      Form,
      FormGroup,
      Checkbox,
      RadioButtonGroup,
      RadioButton,
      Select,
      SelectItem,
      Button,
    } from "carbon-components-svelte";
import type { Search_Query } from "./search_query";
    
    export let data:{params:Search_Query};

  
    $: params = data.params;
  </script>


<svelte:head>
	<title>Properties</title>
	<meta name="description" content="Search for specific properties" />
</svelte:head>




  <Form on:submit method="GET">
    <FormGroup>
        <RadioButtonGroup name="purchase_type" selected="{params.purchase_type}">
            <RadioButton
            value="buy"
            name="purchase_type"
            labelText="Buy"
          />
          <RadioButton
            value="rent"
            name="purchase_type"
            labelText="Rent"
          />
          <RadioButton
            value="dev"
            name="purchase_type"
            labelText="Developments"
          />
         
        </RadioButtonGroup>
      </FormGroup>
    
    <FormGroup>
      <Select labelText="Location"  name="location" selected="{params.location}">
        <SelectItem
          value="null"
          text="Choose an option"
        />
        <SelectItem value="area1" text="Area1" />
        <SelectItem value="area2" text="Area2" />
        <SelectItem value="area3" text="Area3" />
      </Select>

      <Select labelText="Min Price"  name="min_price" selected="{params.min_price}">
        {#each [...Array(20).keys()] as i }
        <SelectItem
        value="{i*100000}"
        text="{i*100000 + ""}"
      />
        {/each}
      </Select>
    </FormGroup>
    <Button type="submit">Submit</Button>
  </Form>
  
