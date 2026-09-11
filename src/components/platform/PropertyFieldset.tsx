import { FormPanel } from "./FormCard";
import { FormField, FormPhoneField, FormSelect } from "./FormField";
import { LEASE_YEARS, MONTHS, NAME_FIELDS, US_STATES } from "@/lib/platform/new-order";

/*
 * One "Property Information" block of the New Order form — Figma node
 * 18176:14102, repeated as 18176:14119 for the second property.
 *
 * Drawn twice in the design with identical structure and only the heading
 * number changing, so it is one component used twice rather than two copies.
 *
 * Field names are suffixed with the block index; without it the two blocks
 * would submit colliding names and a label would point at the wrong input.
 */
export function PropertyFieldset({ index }: { index: number }) {
  const key = (name: string) => `property-${index}-${name}`;

  return (
    <FormPanel label={`Property Information ${index}`}>
      {/* Lease Term — a label column, then From and To as month + year pairs. */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
        <div className="flex min-w-px flex-col gap-1 px-3 xl:w-56 xl:shrink-0">
          <p className="text-label-xs text-app-text">Lease Term</p>
          <p className="text-label-2xs text-app-text-tertiary">
            Please provide information for at least 5 years.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <FormSelect
            name={key("from-month")}
            label="From"
            placeholder="Month"
            options={MONTHS}
            className="w-30"
          />
          <FormSelect
            name={key("from-year")}
            label="&nbsp;"
            placeholder="Year"
            options={LEASE_YEARS}
            className="w-30"
          />
          <FormSelect
            name={key("to-month")}
            label="To"
            placeholder="Month"
            options={MONTHS}
            className="w-30"
          />
          <FormSelect
            name={key("to-year")}
            label="&nbsp;"
            placeholder="Year"
            options={LEASE_YEARS}
            className="w-30"
          />
        </div>
      </div>

      <FormField name={key("street")} label="Street Address" placeholder="Type here..." />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <FormField name={key("unit")} label="Unit#" placeholder="XXXXX" />
        <FormSelect
          name={key("city")}
          label="City"
          placeholder="Select an option..."
          options={["Philadelphia", "Topeka", "Woodland Hills", "San Antonio"]}
        />
        <FormSelect
          name={key("state")}
          label="State"
          placeholder="Select an option..."
          options={US_STATES}
        />
        <FormField name={key("zip")} label="ZIP Code" placeholder="XXXXX" />
      </div>

      <FormPanel label="Landlord Information">
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr_1fr]">
          {NAME_FIELDS.map((field) => (
            <FormField
              key={field.name}
              name={key(`landlord-${field.name}`)}
              label={field.label}
              placeholder="Type here..."
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FormField
            name={key("landlord-email")}
            label="Email Address"
            placeholder="example@email.com"
            type="email"
            icon="mail"
          />
          <FormPhoneField name={key("landlord-phone")} label="Phone Number" />
        </div>
      </FormPanel>
    </FormPanel>
  );
}
