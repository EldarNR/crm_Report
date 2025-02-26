import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { createBrowserClient } from "@supabase/ssr";
import { type Organization } from "~/components/formReports/index.vue";
import { supabase } from "./supabase/supabase";

export interface reports {
  id: number;
  full_name?: string;
  created_at: string;
  email?: string;
  phone?: string;
  file: File | null;
  description: string;
  date: string;
  anonymous: boolean;
  departament: string;
  fileUid: string;
  status: string[];
  respons: string;
}

export const useStorage = defineStore({
  id: "Main",
  state: () => ({
    Error: {
      auth: {
        alert: false as boolean,
        message: "" as string,
        title: "" as string,
        svg: "" as string,
      },
    },
    AllReports: {
      List: [] as reports[],
      loading: true as boolean,
    },
    AllOrganization: {
      List: [] as Organization[],
      loading: true as boolean,
    },

    FindReport: { Loading: false, Data: {} },

    language: "kz" as string,
  }),

  getters: {
    list: (state) => state.AllReports,
  },

  actions: {
    RangeError(message: string, checker: string) {
      const closeAlert = () => {
        return setTimeout(() => {
          this.Error.auth.alert = false;
          this.Error.auth.message = "";
        }, 5000);
      };
      if (checker === "Error") {
        this.Error.auth.message = message;
        this.Error.auth.alert = true;
        this.Error.auth.title = "Error";
        closeAlert();
      } else if (checker === "Success") {
        this.Error.auth.message = message;
        this.Error.auth.title = "Success";
        this.Error.auth.alert = true;
        closeAlert();
      }
    },
    generateUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    async SignIn(email: string, password: string) {
      try {
        console.log(email, password);
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) {
          this.RangeError("Ошибка! " + error.message, "Error");
        } else {
          this.RangeError("Успешно! Добро пожаловать.", "Success");
        }
      } catch (e) {
        this.RangeError("Ошибка! " + e, "Error");
        return;
      }
    },
    async uploadFile(file: File, uid: string) {
      try {
        console.log("2", uid);
        const { data, error } = await supabase.storage
          .from("reports_file")
          .upload(uid, file);
        if (error) {
          this.RangeError("Ошибка! " + error.message, "Error");
        } else {
          this.RangeError("Успешно! Добро пожаловать.", "Success");
        }
      } catch (e) {
        this.RangeError("Ошибка! " + e, "Error");
      }
    },
    async PostMessage(
      fullName?: string,
      message?: string,
      email?: string,
      phone?: string,
      departament?: string[],
      anonymousMode?: boolean,
      file?: any,
      fileUid?: string
    ) {
      if (!message || !departament || anonymousMode === undefined) {
        this.RangeError("Ошибка! Обязательные параметры отсутствуют", "Error");
        return;
      }

      const dataProps = reactive({
        fullName: fullName || null,
        uid: fileUid || this.generateUUID(),
        email: email || null,
        phone: phone || null,
      });

      try {
        const { data, error } = await supabase.from("reports").insert({
          full_name: dataProps.fullName,
          description: message,
          email: dataProps.email,
          phone: dataProps.phone,
          departament: departament,
          anonymous: anonymousMode,
          fileUid: dataProps.uid,
          status: ["На рассмотрении", "Тексерісте"],
        });

        if (error) {
          this.RangeError("Ошибка! " + error, "Error");
          return;
        }
        this.RangeError("Успешно! " + data, "Success");
      } catch (e) {
        this.RangeError("Ошибка! " + e, "Error");
        return;
      } finally {
        if (file) {
          console.log("1", dataProps.uid);
          this.uploadFile(file, dataProps.uid);
        }
        return;
      }
    },
    async getAllReports() {
      try {
        let { data: reports, error } = await supabase
          .from("reports")
          .select("*");
        if (error) {
          this.RangeError("Ошибка! " + error, "Error");
        }
        this.RangeError("Успешно!", "Success");
        this.AllReports.List = reports as reports[];
        console.log(this.AllReports.List);
      } catch (e) {
        this.RangeError("Ошибка! " + e, "Error");
      } finally {
        this.AllReports.loading = false;
      }
    },
    async getAllOrganization() {
      try {
        let { data: organization, error } = await supabase
          .from("organization")
          .select("*");
        if (error) {
          this.RangeError("Ошибка! " + error, "Error");
        }
        this.AllOrganization.List = organization as Organization[];
      } catch (e) {
        this.RangeError("Ошибка! " + e, "Error");
      } finally {
        this.AllOrganization.loading = false;
      }
    },

    async signOut(): Promise<void> {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.log(error);
        }
        console.log("Admin exited");
      } catch (e) {
        console.log(e, "signOut error!");
      }
    },
    async removeReport(id: number | number[]) {
      try {
        const { error } = await supabase.from("reports").delete().eq("id", id);
        if (error) {
          console.log(error, "delete error");
        }
        console.log("deleted!");
      } catch (e) {
        console.log(e, "delete error");
      } finally {
        this.getAllReports();
      }
    },
    filterReport(words: string) {
      if (words === "All") {
        this.getAllReports();
      } else if (words !== "All") {
        this.AllReports.List = this.AllReports.List.filter((report) =>
          report.departament.includes(words)
        );
      } else {
        console.log("Ошибка! таких данных нету", "Error");
      }
    },
    search(words: string) {
      console.log(words);
      this.AllReports.List = this.AllReports.List.filter((report) =>
        report.description.includes(words)
      );
    },
    async createOrganization(organization: string[], supervisor: string) {
      try {
        const { data, error } = await supabase
          .from("organization")
          .insert([{ nameArray: organization, supervisor: supervisor }])
          .select();
        if (error) {
          console.log(error);
        }
        console.log(data);
      } catch (e) {
        console.log(e);
      } finally {
        this.getAllOrganization();
      }
    },
    async removeOrganization(id: number) {
      try {
        const { error } = await supabase
          .from("organization")
          .delete()
          .eq("id", id);
        if (error) {
          console.log(error);
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.getAllOrganization();
      }
    },
    async changeStatusReport(
      id: number | undefined,
      status: string,
      respons: string
    ) {
      try {
        const { data, error } = await supabase
          .from("reports")
          .update({ status: status, respons: respons })
          .eq("id", id)
          .select();
        if (error) {
          console.log(error);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async changeNameOrganizating(id: number, name: string) {
      try {
        const { data, error } = await supabase
          .from("organization")
          .update({ name: name })
          .eq("id", id)
          .select();
        if (error) {
          console.log(error);
        }
        console.log(data, "Данные успешно изменены!");
      } catch (e) {
        console.log(e);
      }
    },
    async searchDescription(text: string) {},

    async searchById(id: number | string) {
      this.$state.FindReport.Loading = true;
      try {
        let { data: reports, error } = await supabase
          .from("reports")
          .select("*")
          .eq("id", id);

        if (error) {
          console.log("Error:", error);
        } else if (reports === null) {
          console.log("No reports found for ID:", id);
        } else {
          console.log(
            "Reports found:",
            (this.$state.FindReport.Data = reports)
          );
        }
      } catch (e) {
        console.log("Exception caught:", e);
      } finally {
        this.$state.FindReport.Loading = false;
      }
    },

    sortByData(respons: boolean) {
      const parseDate = (dateString: any) => new Date(dateString).getTime();
      if (respons) {
        this.AllReports.List.sort(
          (a, b) => parseDate(a.created_at) - parseDate(b.created_at)
        );
      } else if (!respons) {
        this.AllReports.List.sort(
          (a, b) => parseDate(b.created_at) - parseDate(a.created_at)
        );
      } else {
        console.log("Error by sorting");
      }
    },

    changeLanguage() {
      if (this.$state.language === "kz") {
        this.$state.language = "ru";
      } else {
        this.$state.language = "kz";
      }
    },
  },
});
