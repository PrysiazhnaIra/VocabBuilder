import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Button/Button";
import s from "./AddWordForm.module.css";
import type { AddWordBody } from "../../types/types";
import Icon from "../Icon/Icon";
import {
  useAddWordMutation,
  useGetCategoriesQuery,
} from "../../redux/api/wordApi";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { toast } from "react-toastify";

export default function AddWordForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddWordBody>();

  const [addWord, { isLoading }] = useAddWordMutation();
  const dispatch = useAppDispatch();

  const { data: categories } = useGetCategoriesQuery();

  const selectedCategory = watch("category");

  const onSubmit: SubmitHandler<AddWordBody> = async (data) => {
    if (isLoading) return;
    const isIrregularValue =
      data.category === "verb" && data.isIrregular
        ? data.isIrregular === "irregular"
        : undefined;

    const payload = {
      ...data,
      isIrregular: isIrregularValue,
    };

    try {
      await addWord(payload).unwrap();

      toast.success("Word added successfully!");
      onClose();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Error adding a word.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.fieldGroup}>
          <select
            {...register("category", { required: "Select category!" })}
            className={s.selectInput}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Select category
            </option>
            {categories?.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className={s.errorText}>{errors.category.message}</span>
          )}
        </div>

        {selectedCategory === "verb" && (
          <div className={s.radioGroup}>
            <label>
              <input
                type="radio"
                value="regular"
                {...register("isIrregular", {
                  required:
                    selectedCategory === "verb" ? "Select verb type" : false,
                })}
              />
              <span>Regular</span>
            </label>
            <label>
              <input
                type="radio"
                value="irregular"
                {...register("isIrregular")}
              />
              <span>Irregular</span>
            </label>
            {selectedCategory === "verb" && errors.isIrregular && (
              <span className={s.errorText}>{errors.isIrregular.message}</span>
            )}
          </div>
        )}

        <div className={s.inputWrapper}>
          <div className={s.labelWithIcon}>
            <Icon name="icon-ukraine" className={s.icon} />
          </div>
          <input
            {...register("ua", {
              required: "Enter Ukrainian word",
              pattern: {
                value: /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
                message: "Enter Ukrainian correct word",
              },
            })}
            placeholder="Працювати"
            className={errors.ua ? s.inputError : s.input}
          />
          {errors.ua && (
            <span className={s.errorText}>{errors.ua.message}</span>
          )}
        </div>

        <div className={s.inputWrapper}>
          <div className={s.labelWithIcon}>
            <Icon name="icon-united-kingdom" className={s.icon} />
          </div>
          <input
            {...register("en", {
              required: "Enter English word",
              pattern: {
                value: /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
                message: "Enter English correct word",
              },
            })}
            placeholder="Work"
            className={errors.en ? s.inputError : s.input}
          />
          {errors.en && (
            <span className={s.errorText}>{errors.en.message}</span>
          )}
        </div>

        <div className={s.btnWrapper}>
          <Button type="submit" className={s.addBtn}>
            Add
          </Button>
          <Button type="button" onClick={onClose} className={s.cancelBtn}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
