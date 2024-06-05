import { SubmitHandler, useForm } from "react-hook-form";
import { StatusForm } from "../types/types";

export const RatePage = () => {
  const { register, handleSubmit } = useForm<StatusForm>();

  const onSubmit: SubmitHandler<StatusForm> = (data) => console.log(data);

  return (
    <div className="statusPage">
      <h1>Update Status</h1>
      <form className="statusForm" onSubmit={handleSubmit(onSubmit)}>
        <select {...register("status")}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <input {...register("location")} />
        <select {...register("rating")}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
