import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
      
    },
    phone: {
      type: Number,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    dob: {
      type: Date,
      required: true,
    },

    assignedSubject: {
      type: String,
      required: true,
      lowercase:true
      
    },

    photo: {
      type: String,
      default: function () {
        if (this.gender === "male") {
          return "https://media.istockphoto.com/id/1327592420/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=aAIjqieKoc81QA6iaU4Yq40v_iAjJuYhstSgWy75r2k=";
        } else if (this.gender === "female") {
          return "https://media.istockphoto.com/vectors/default-avatar-photo-placeholder-icon-grey-profile-picture-business-vector-id1327592652?k=20&m=1327592652&s=612x612&w=0&h=veT54efibfTLVhEo4e1EEmuffCTZ8rIy1K46oIEZETk=";
        } else {
          return "https://www.bikeauckland.org.nz/wp-content/uploads/2021/08/placeholder-dp.png";
        }
      },
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
); 

const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;
