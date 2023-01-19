import { NextPageWithLayout } from './_app';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormProps } from 'react-hook-form';
import { z } from 'zod';
import { trpc } from '../utils/trpc';

/**
 * Todo:
 * string
 * number (optional)
 * date
 * file upload
 * remove unnecesary code
 */

// validation schema is used by server
export const validationSchema = z.object({
  name: z.string().min(1),
  age: z.coerce.number().optional(),
});

const useZodForm = <TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  },
) => {
  const form = useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
};

const SubmitPage: NextPageWithLayout = () => {
  const utils = trpc.useContext().post;

  const methods = useZodForm({
    schema: validationSchema,
    defaultValues: {
      name: '',
    },
  });

  console.log(methods.formState.errors);

  const mutation = trpc.post.new.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
    },
  });

  return (
    <>
      <h1>Doggie Catalog</h1>

      <hr />

      <h3>Add a Doggie</h3>

      <form
        onSubmit={methods.handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
          methods.reset();
        })}
      >
        <label>
          Name
          <br />
          <input {...methods.register('name')} />
          <input
            {...methods.register('age', {
              setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)),
            })}
            type="number"
          />
        </label>

        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Loading' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default SubmitPage;
